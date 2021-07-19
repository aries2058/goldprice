package com.dandj.jtoday.repository.comm;

import com.dandj.jtoday.entity.comm.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<List<Board>> findBoardByWriter(String userId);
    Optional<List<Board>> findBoardByBoardTyp(String typ);
    Optional<List<Board>> findBoardByPidOrderByModDateDesc(Long id);
    Optional<Board> findBoardById(Long id);

    Page<Board> findAll(Specification<Board> spec, Pageable pageable);
    Page<Board> findBoardsByBoardTypOrderByModDateDesc(String typ, Pageable pageable);
}
