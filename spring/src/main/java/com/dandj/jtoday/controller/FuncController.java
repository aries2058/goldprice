package com.dandj.jtoday.controller;

import com.dandj.jtoday.dto.apis.MailDto;
import com.dandj.jtoday.service.func.ImageService;
import com.dandj.jtoday.service.func.MailService;
import lombok.AllArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import sun.security.util.IOUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @PostMapping("/mail")
    public ResponseEntity<String> execMail(MailDto mailDto) {
        mailService.mailSend(mailDto);
        return new ResponseEntity("", HttpStatus.OK);
    }

    @PostMapping("/getImageList")
    public ResponseEntity<List<byte[]>> getImageList(List<Long> ids){
        HttpHeaders headers = new HttpHeaders();
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());

        List<byte[]> contents = imageService.getImages(ids);

        return new ResponseEntity<>(contents, headers, HttpStatus.OK);
    }
    @PostMapping("/getImage")
    public ResponseEntity<byte[]> getImage(Long id){
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
}
