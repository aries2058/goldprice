package com.dandj.jtoday.controller;

import com.dandj.jtoday.dto.comm.MailDto;
import com.dandj.jtoday.service.func.ImageService;
import com.dandj.jtoday.service.func.MailService;
import com.dandj.jtoday.service.func.PushService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@AllArgsConstructor
@RequestMapping("/func")
public class FuncController {
    private final MailService mailService;
    private final ImageService imageService;
    private final PushService pushService;

    @PostMapping("/mail")
    public ResponseEntity<String> execMail(MailDto mailDto) {
        mailService.mailSend(mailDto);
        return new ResponseEntity("", HttpStatus.OK);
    }

    @PostMapping("/uploadMarketMainImage")
    public ResponseEntity<String> uploadMarketMainImage(String user_id, MultipartFile file) throws Exception {
        return new ResponseEntity<>(imageService.uploadMarketMainImage(user_id, file), HttpStatus.OK) ;
    }
    @PostMapping("/uploadImage")
    public ResponseEntity<Long> uploadImage(String typ, MultipartFile[] file) throws Exception {
        return new ResponseEntity<>(imageService.uploadImage(typ, file), HttpStatus.OK) ;
    }

    @GetMapping("/getImagePath")
    public ResponseEntity<String> getImagePath(Long id) {
        return new ResponseEntity<>(imageService.getImagePath(id), HttpStatus.OK) ;
    }

    @GetMapping({"/display"})
    public ResponseEntity<byte[]> getFile(String fileName) {
        ResponseEntity result = null;

        try {
            String srcFileName = URLDecoder.decode(fileName, "UTF-8");
            File file = new File("/home/ubuntu/storage" + File.separator + srcFileName);
            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", "image/jpeg");
            result = new ResponseEntity(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
            return result;
        } catch (Exception var6) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping(value="/setPushToken")
    public ResponseEntity<Long> register(Long uuid, String token, String typ, String push_yn, Long id){
        if(push_yn.equals("Y")){
            return new ResponseEntity<>(pushService.register(token, typ, uuid), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(pushService.ignorePush(token, typ, uuid), HttpStatus.OK);
        }
    }

    @PostMapping(value="/sendPush")
    public ResponseEntity<String> sendPush(String title, String body) throws JsonProcessingException {
        return new ResponseEntity<>(pushService.send(title, body), HttpStatus.OK);
    }
}
