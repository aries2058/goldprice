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

    @GetMapping("/getImage")
    public ResponseEntity<byte[]> getImage(Long id) throws SQLException {
        HttpHeaders headers = new HttpHeaders();
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());
        byte[] contents = imageService.getImage(id);

        return new ResponseEntity<>(contents, headers, HttpStatus.OK);
    }

    @PostMapping("/uploadImageFiles")
    public ResponseEntity<List<Long>> uploadImageFiles(MultipartFile[] uploadFiles) throws SQLException, IOException {
        List<Long> ret = imageService.uploadImageFiles(uploadFiles);
        return  new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<Long> uploadImage(String imageString) throws SQLException {
        return new ResponseEntity<>(imageService.uploadImage(imageString), HttpStatus.OK) ;
    }

    @PostMapping("/uploadImageToFile")
    public ResponseEntity<String> uploadImageToFile(String user_id, MultipartFile file) throws Exception {
        return new ResponseEntity<>(imageService.saveImageToFile(user_id, file), HttpStatus.OK) ;
    }

    @GetMapping({"/display"})
    public ResponseEntity<byte[]> getFile(String fileName) {
        ResponseEntity result = null;

        try {
            String srcFileName = URLDecoder.decode(fileName, "UTF-8");
            File file = new File("/volume1/hjlee/storage" + File.separator + srcFileName);
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
            return new ResponseEntity<>(pushService.register(token, typ, uuid, id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(pushService.ignorePush(token, typ, uuid, id), HttpStatus.OK);
        }
    }

    @PostMapping(value="/sendPush")
    public ResponseEntity<String> sendPush(String title, String body) throws JsonProcessingException {
        return new ResponseEntity<>(pushService.send(title, body), HttpStatus.OK);
    }
}
