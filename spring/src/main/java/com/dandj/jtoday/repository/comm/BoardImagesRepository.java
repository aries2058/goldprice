package com.dandj.jtoday.repository.comm;

import com.dandj.jtoday.entity.comm.BoardImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardImagesRepository extends JpaRepository<BoardImages, Long> {
    Optional<List<BoardImages>> findBoardImagesByBoardId(Long id);
}
