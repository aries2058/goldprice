package com.dandj.jtoday.service.func;

import com.dandj.jtoday.entity.comm.PushToken;
import com.dandj.jtoday.entity.member.Member;
import com.dandj.jtoday.repository.comm.PushTokenRepository;
import com.dandj.jtoday.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
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

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

@Service
@RequiredArgsConstructor
public class PushService {

    @Autowired
    private RestTemplate restTemplate;
    @Value("${kakao.restapi.key}")
    private String apikey;

    private final PushTokenRepository pushTokenRepository;

    public String send(String message){
        Optional<List<PushToken>> list = pushTokenRepository.findPushTokensByPushYn("Y");
        StringBuilder uuids = new StringBuilder();
        list.ifPresent(push->{
            push.forEach(x->{
                uuids.append(x+",");
            });
        });

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", "KakaoAK " + apikey);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("uuids", "[" + uuids.toString()+ "]");
        params.add("push_message", "{\n" +
                "  \"for_apns\":{\n" +
                "    \"badge\":3,\n" +
                "    \"sound\":\"sound_file\",\n" +
                "    \"push_alert\":true,\n" +
                "    \"message\":\"홍길동님 외 2명이 댓글을 달았습니다.\",\n" +
                "    \"custom_field\":{\n" +
                "      \"article_id\":\"111\",\n" +
                "      \"comment_id\":\"222\"\n" +
                "    }\n" +
                "  },\n" +
                "  \"for_fcm\":{\n" +
                "    \"collapse\": \"articleId123\",\n" +
                "    \"delay_while_idle\":false,\n" +
                "    \"custom_field\": {\n" +
                "      \"article_id\": 111,\n" +
                "      \"comment_id\": 222,\n" +
                "      \"comment_preview\": \"나의 댓글을 받아랏!...(생략)\"\n" +
                "    }\n" +
                "  }\n" +
                "}");

        restTemplate.postForObject(
                "https://kapi.kakao.com/v2/push/send",
                params, String.class);

        return "";
    }

    public Long register(String token, String typ, Long uuid, Long id){
        PushToken pushToken;
        if(id == null){
            pushToken = PushToken.builder()
                    .uuid(uuid)
                    .pushYn("Y")
                    .pushType(typ)
                    .pushToken(token).build();
            pushTokenRepository.save(pushToken);
        }else{
            pushToken = pushTokenRepository.getById(id);
        }
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

        return pushToken.getId();
    }

    public Long ignorePush(String token, String typ, Long uuid, Long id){
        PushToken pushToken;
        if(id == null){
            pushToken = PushToken.builder()
                    .uuid(uuid)
                    .pushYn("N").build();
            pushTokenRepository.save(pushToken);
            return pushToken.getId();
        }else{
            pushToken = pushTokenRepository.getById(id);
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
