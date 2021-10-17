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

    public String uploadMarketMainImage(String user_id, MultipartFile multipartFile) throws Exception {
        String ret = fileHandler.parseFileInfoForMarketMainImage(user_id, multipartFile);
        return ret;
    }

    public Long uploadImage(String typ, MultipartFile[] multipartFile) throws Exception {
        String ret = fileHandler.parseFileInfo(multipartFile, typ);
        Images images = Images.builder()
                .path(ret).build();
        imagesRepository.save(images);
        return images.getId();
    }

    public String getImagePath(Long id){
        Optional<Images> images = imagesRepository.findById(id);
        String path = "";
        if(images.isPresent()){
            path = images.get().getPath();
        }
        return path;
    }
}
