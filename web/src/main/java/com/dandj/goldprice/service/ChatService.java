package com.dandj.goldprice.service;

import com.dandj.goldprice.dto.ChatDto;
import com.dandj.goldprice.dto.CompDto;
import com.dandj.goldprice.dto.MemberFileDto;
import com.dandj.goldprice.entity.Chat;
import com.dandj.goldprice.entity.Comp;
import com.dandj.goldprice.entity.MemberFile;
import com.dandj.goldprice.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

    public List<ChatDto> getChat(String userid, int sttPage){
        Pageable pageable = PageRequest.of(sttPage, 50);
        Page<Chat> result = chatRepository.findChatByUserId(userid, pageable);
        List<ChatDto> list = new ArrayList<>();
        result.forEach(chat -> {
            list.add(chatEntityToDto(chat));
        });
        return list;
    }
    public String delChat(String ids){
        String[] arr = ids.split(",");
        for(String id : arr){
            Chat chat = chatRepository.findById(Long.parseLong(id)).get();
            if(chat != null){
                chat.setDelYn("Y");
                chatRepository.save(chat);
            }
        }
        return "OK";
    }
    public String postChat(ChatDto dto){
        Chat chat = chatDtoToEntity(dto);
        chatRepository.save(chat);
        return "OK";
    }

    private ChatDto chatEntityToDto(Chat entity){
        ChatDto dto = ChatDto.builder()
                .id(entity.getId())
                .content(entity.getContent())
                .delYn(entity.getDelYn())
                .sendYn(entity.getSendYn())
                .regDate(entity.getRegDate()).build();
        return dto;
    }
    private Chat chatDtoToEntity(ChatDto dto){
        Chat entity = Chat.builder()
                .userId(dto.getUserId())
                .content(dto.getContent())
                .sendYn(dto.getSendYn())
                .newYn(dto.getNewYn())
                .delYn("N").build();
        return entity;
    }
}