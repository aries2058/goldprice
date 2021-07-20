package com.dandj.jtoday.handler;

import com.dandj.jtoday.entity.comm.Images;
import com.dandj.jtoday.entity.member.MemberImages;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.sql.Blob;
import java.util.UUID;

@Component
public class FileHandler {
    @Value("${app.upload.path}")
    private String uploadPath;

    public String parseFileInfo(String user_id, MultipartFile multipartFile) throws Exception{
        String absolutePath = new File(uploadPath).getAbsolutePath();
        String contentType = multipartFile.getContentType();
        String originalFileExtension = ".png";

        if(contentType.contains("image/jpeg")){
            originalFileExtension = ".jpg";
        }
        else if(contentType.contains("image/gif")){
            originalFileExtension = ".gif";
        }
        UUID uuid = UUID.randomUUID();
        String new_file_name = uuid + originalFileExtension;

        String path =  "/"+ user_id;
        File file = new File(absolutePath + "/" + user_id);
        if(!file.exists()){
            file.mkdirs();
        }

        file = new File(absolutePath + path + "/" + new_file_name);
        multipartFile.transferTo(file);

        return path + "/" + new_file_name;
    }
}
