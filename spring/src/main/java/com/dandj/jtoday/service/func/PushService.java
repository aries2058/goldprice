package com.dandj.jtoday.service.func;

import com.dandj.jtoday.dto.comm.PushDto;
import com.dandj.jtoday.entity.comm.PushToken;
import com.dandj.jtoday.repository.comm.PushTokenRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PushService {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${kakao.restapi.key}")
    private String apikey;

    private final PushTokenRepository pushTokenRepository;

    public String send(String title, String body) throws JsonProcessingException {
        Optional<List<PushToken>> pushTokens = pushTokenRepository.findPushTokensByPushYn("Y");
        List<String> list = new ArrayList<>();
        pushTokens.ifPresent(push->{
            push.forEach(x->{
                list.add(x.getUuid()+"");
            });
        });
        String uuids = "[" + String.join(",", list) + "]";

        PushDto.PushNotificationDto notificationDto = PushDto.PushNotificationDto.builder().title(title).body(body).build();
        PushDto.PushCustomFieldDto customFieldDto = PushDto.PushCustomFieldDto.builder().type("openapp").build();
        PushDto.PushFcmDto fcmDto = PushDto.PushFcmDto.builder().customField(customFieldDto).notification(notificationDto).build();
        PushDto pushDto = PushDto.builder().forFcm(fcmDto).build();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("uuids", uuids);
        params.add("push_message", objectMapper.writeValueAsString(pushDto));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", "KakaoAK " + apikey);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/push/send",
                HttpMethod.POST,
                entity,
                String.class);


        return response.getBody();
    }

    public Long register(String token, String typ, Long uuid){
        PushToken pushToken = pushTokenRepository.findPushTokenByPushTokenAndUuid(token, uuid);
        if(pushToken == null){
            pushToken = PushToken.builder()
                    .uuid(uuid)
                    .pushYn("Y")
                    .pushType(typ)
                    .pushToken(token).build();
            pushTokenRepository.save(pushToken);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("uuid", uuid+"");
            params.add("device_id", pushToken.getId()+"");
            params.add("push_type", typ);
            params.add("push_token", token);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "KakaoAK " + apikey);

            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
            ResponseEntity<Integer> response = restTemplate.exchange(
                    "https://kapi.kakao.com/v2/push/register",
                    HttpMethod.POST,
                    entity,
                    Integer.class);

            Calendar cal = Calendar.getInstance();
            cal.setTime(new Date());
            cal.add(Calendar.DATE, response.getBody());
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            pushToken.setExpireDt(df.format(cal.getTime()));
            pushTokenRepository.save(pushToken);

            return pushToken.getId();
        }else{
            return pushToken.getId();
        }
    }

    public Long ignorePush(String token, String typ, Long uuid){
        PushToken pushToken = pushTokenRepository.findPushTokenByPushTokenAndUuid(token, uuid);
        if(pushToken == null){
            pushToken = PushToken.builder()
                    .uuid(uuid)
                    .pushYn("N")
                    .pushType(typ)
                    .pushToken(token).build();
            pushTokenRepository.save(pushToken);
        }else {
            pushToken.setPushYn("N");
            pushTokenRepository.save(pushToken);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("uuid", uuid+"");
            params.add("device_id", pushToken.getId()+"");
            params.add("push_type", typ);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "KakaoAK " + apikey);

            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
            ResponseEntity<Integer> response = restTemplate.exchange(
                    "https://kapi.kakao.com/v2/push/deregister",
                    HttpMethod.POST,
                    entity,
                    Integer.class);

        }
        return pushToken.getId();
    }


}
