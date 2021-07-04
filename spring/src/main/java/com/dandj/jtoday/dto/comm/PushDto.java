package com.dandj.jtoday.dto.comm;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PushDto {

    @JsonProperty("for_fcm")
    private PushFcmDto forFcm;

    @JsonProperty("for_apns")
    private PushApnsDto forApns;

    @Data
    @Builder
    public static class PushFcmDto{
        @JsonProperty("notification")
        private PushNotificationDto notification;
        @JsonProperty("custom_field")
        private PushCustomFieldDto customField;
    }

    @Data
    @Builder
    public static class PushApnsDto{
        @JsonProperty("message")
        private List<String> message;
        @JsonProperty("custom_field")
        private PushCustomFieldDto customField;
    }

    @Data
    @Builder
    public static class PushCustomFieldDto{
        private String url;
    }

    @Data
    @Builder
    public static class PushNotificationDto{
        private String title;
        private String body;
    }

}
