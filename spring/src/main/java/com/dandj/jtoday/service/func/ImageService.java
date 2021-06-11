package com.dandj.jtoday.service.func;

import com.dandj.jtoday.entity.comm.Images;
import com.dandj.jtoday.repository.ImagesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Log4j2
@RequiredArgsConstructor
public class ImageService {
    final private ImagesRepository imagesRepository;

    public List<byte[]> getImages(List<Long> imageId){
        List<byte[]> ret = new ArrayList<>();
        List<Images> img = imagesRepository.findAllById(imageId);
        img.forEach(x->{
            try {
                int len = (int)x.getContent().length();
                ret.add(x.getContent().getBytes(1, len));
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        });
        return ret;
    }

    public byte[] getImage(Long imageId){
        List<byte[]> ret = new ArrayList<>();
        Optional<Images> img = imagesRepository.findById(imageId);
        img.ifPresent(x->{
            try {
                int len = (int)x.getContent().length();
                ret.add(x.getContent().getBytes(1, len));
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        });

        return ret.get(0);
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
}
