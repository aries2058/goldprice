package com.dandj.goldprice.controller;

import com.dandj.goldprice.dto.ChatDto;
import com.dandj.goldprice.dto.CompDto;
import com.dandj.goldprice.service.ChatService;
import com.dandj.goldprice.service.MapService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("api")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping(value="/chat/getChat")
    public List<ChatDto> getChat(String userid, int sttPage){
        return chatService.getChat(userid, sttPage);
    }
    @GetMapping(value="/chat/delChat")
    public String delChat(String ids){
        return chatService.delChat(ids);
    }
    @PostMapping(value="/chat/postChat")
    public String postChat(ChatDto dto){
        return chatService.postChat(dto);
    }
}
