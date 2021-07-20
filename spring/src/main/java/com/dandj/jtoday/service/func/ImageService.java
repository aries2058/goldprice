package com.dandj.jtoday.service.func;

import com.dandj.jtoday.entity.comm.Images;
import com.dandj.jtoday.handler.FileHandler;
import com.dandj.jtoday.repository.comm.ImagesRepository;
import com.dandj.jtoday.service.market.MarketServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;

@Service
@Log4j2
@RequiredArgsConstructor
public class ImageService {
    final private ImagesRepository imagesRepository;
    final private FileHandler fileHandler;

    public byte[] getImage(Long imageId) throws SQLException {
        byte[] ret = new byte[0];
        Optional<Images> img = imagesRepository.findById(imageId);
        if(img.isPresent()){
            int len = (int)img.get().getContent().length();
            ret = img.get().getContent().getBytes(1, len);
        }
        return ret;
    }

    public List<Long> uploadImageFiles(MultipartFile[] uploadFiles) throws IOException, SQLException {
        List<Long> ret = new ArrayList<>();
        for(MultipartFile uploadFile: uploadFiles){
            Blob content = new SerialBlob(uploadFile.getBytes());
            Images images = Images.builder()
                    .content(content).build();
            imagesRepository.save(images);
            ret.add(images.getId());
        }
        return  ret;
    }

    public Long uploadImage(String imageString) throws SQLException {
        byte[] img = imageString.getBytes(StandardCharsets.UTF_8);
        Blob content = new SerialBlob(img);
        Images images = Images.builder()
                .content(content).build();
        imagesRepository.save(images);
        return images.getId();
    }

    public String saveImageToFile(String user_id, MultipartFile multipartFile) throws Exception {
        String ret = fileHandler.parseFileInfo(user_id, multipartFile);
        return ret;
    }
}
