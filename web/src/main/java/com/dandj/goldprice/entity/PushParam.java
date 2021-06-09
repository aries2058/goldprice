package com.dandj.goldprice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PushParam {
    private String[] uuids;
    private JSONObject push_message;
}
