package com.dandj.goldprice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@Log4j2
@RequestMapping("api")
public class FileStorageController {
    @Value("${app.upload.path}")
    private String uploadPath;

    @GetMapping("/display")
    public ResponseEntity<byte[]> getFile(String fileName){
        ResponseEntity<byte[]> result = null;
        try{
            String srcFileName = URLDecoder.decode(fileName, "UTF-8");
            File file = new File(uploadPath + File.separator + srcFileName);
            HttpHeaders header = new HttpHeaders();

            header.add("Content-Type", Files.probeContentType(file.toPath()));
            result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return result;
    }

    @PostMapping("/uploadFile")
    public List<String> upladFile(MultipartFile[] uploadFiles){
        String folderPath = makeFolder();
        List<String> list = new ArrayList<>();
        for(MultipartFile uploadFile: uploadFiles){
            String fileName = StringUtils.cleanPath(uploadFile.getOriginalFilename());
            String uuid = UUID.randomUUID().toString();
            String path = folderPath + File.separator + uuid + "_" + fileName;
            String saveName = uploadPath + File.separator + path;
            Path savePath = Paths.get(saveName);

            try{
                uploadFile.transferTo(savePath);
                list.add(path);
            }catch (IOException e){
                log.info("IOException: " + e);
                e.printStackTrace();
            }
        }
        return  list;
    }

    private String makeFolder(){
        String str = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        String path = str.replace("//", File.separator);

        File dir = new File(uploadPath, path);
        if(dir.exists() == false){
            dir.mkdirs();
        }
        return path;
    }
}
