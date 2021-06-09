package com.dandj.goldprice.service;

import com.dandj.goldprice.dto.PriceGoldDto;
import com.dandj.goldprice.entity.Member;
import com.dandj.goldprice.entity.PriceGold;
import com.dandj.goldprice.entity.PushParam;
import com.dandj.goldprice.entity.PushToken;
import com.dandj.goldprice.repository.MemberRepository;
import com.dandj.goldprice.repository.PushTokenRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PushService {
    private final PushTokenRepository pushTokenRepository;
    private final MemberRepository memberRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${kakao.restapi.key}")
    private String apikey;

    public Long send(String message){
        List<String> list = new ArrayList<>();
        pushTokenRepository.findAll().forEach(x-> list.add(x.getUuid()+""));
        String[] uuids = list.toArray(new String[list.size()]);
        JSONObject PushMsgJson = new JSONObject();
        JSONObject for_fcm = new JSONObject();
        JSONObject notification = new JSONObject();
        notification.put("body", message);
        for_fcm.put("notification", notification);
        PushMsgJson.put("for_fcm", for_fcm);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + apikey);

        PushParam pushParam = PushParam.builder()
                .uuids(uuids)
                .push_message(PushMsgJson).build();

        HttpEntity<PushParam> entity = new HttpEntity<>(pushParam, headers);
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/push/send",
                HttpMethod.POST,
                entity,
                String.class);

        return null;
    }

    public Long register(String token, String typ, String userid){
        Member member = memberRepository.findByUserId(userid).get();
        if(member != null){
            PushToken pushToken = PushToken.builder()
                    .uuid(member.getUuid())
                    .pushYn("Y")
                    .pushType(typ)
                    .pushToken(token).build();
            pushTokenRepository.save(pushToken);
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("uuid", member.getUuid()+"");
            params.add("device_id", pushToken.getId()+"");
            params.add("push_type", typ);
            params.add("push_token", token);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "KakaoAK " + apikey);

            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    "https://kapi.kakao.com/v2/push/register",
                    HttpMethod.POST,
                    entity,
                    String.class);

            return pushToken.getId();
        }else{
            return null;
        }
    }
}
