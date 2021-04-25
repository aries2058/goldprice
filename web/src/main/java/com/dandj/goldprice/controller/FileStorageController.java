package com.dandj.goldprice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@Log4j2
@RequestMapping("api")
public class FileStorageController {
    @Value("${app.upload.path}")
    private String uploadPath;

    @PostMapping("/uploadFile")
    public void upladFile(MultipartFile[] uploadFiles){
        String folderPath = makeFolder();

        for(MultipartFile uploadFile: uploadFiles){
            String orgFileName = uploadFile.getOriginalFilename();
            String fileName = orgFileName.substring(orgFileName.lastIndexOf("\\")+1);
            String uuid = UUID.randomUUID().toString();
            String saveName = uploadPath + File.separator + folderPath + File.separator + uuid + "_" + fileName;
            Path savePath = Paths.get(saveName);

            try{
                uploadFile.transferTo(savePath);
            }catch (IOException e){
                e.printStackTrace();
            }
        }
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
