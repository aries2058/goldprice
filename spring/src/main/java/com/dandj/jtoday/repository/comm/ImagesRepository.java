package com.dandj.jtoday.repository.comm;

import com.dandj.jtoday.entity.comm.Images;
import com.dandj.jtoday.entity.member.MemberImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImagesRepository extends JpaRepository<Images, Long> {
}
