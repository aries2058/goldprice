package com.dandj.jtoday.service.func;

import com.dandj.jtoday.dto.comm.BoardDto;
import com.dandj.jtoday.entity.comm.Board;
import com.dandj.jtoday.entity.comm.BoardImages;
import com.dandj.jtoday.entity.market.Market;
import com.dandj.jtoday.entity.market.MarketImages;
import com.dandj.jtoday.entity.member.Member;
import com.dandj.jtoday.repository.comm.BoardImagesRepository;
import com.dandj.jtoday.repository.comm.BoardRepository;
import com.dandj.jtoday.repository.member.MemberRepository;
import com.dandj.jtoday.spec.BoardSpec;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.sql.rowset.serial.SerialBlob;
import java.nio.charset.StandardCharsets;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final BoardImagesRepository boardImagesRepository;

    public List<BoardDto> getList(int sttPage, int perPage, String typ, String searchTyp, String searchVal){
        List<BoardDto> ret = new ArrayList<>();

        Specification<Board> spec = Specification.where(BoardSpec.typ(typ));
        if(searchTyp != null){
            if(searchTyp.equals("T")){
                spec = spec.and(Specification.where(BoardSpec.titleLike(searchVal)));
            }else if(searchTyp.equals("C")){
                spec = spec.and(Specification.where(BoardSpec.contentsLike(searchVal)));
            }else if(searchTyp.equals("W")){
                spec = spec.and(Specification.where(BoardSpec.writer(searchVal)));
            }
        }

        //Sort sort = Sort.by("moddate").descending();
        //Pageable pageable = PageRequest.of(sttPage, perPage, sort);
        Pageable pageable = PageRequest.of(sttPage, perPage);
        Page<Board> data = boardRepository.findBoardsByBoardTypOrderByModDateDesc(typ, pageable);

        data.forEach(x->{
            try {
                Optional<Member> member = memberRepository.findByUserId(x.getWriter());
                ret.add(entityToDto(x, member.get()));
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        });

        return ret;
    }

    public List<BoardDto> getComments(Long pid){
        List<BoardDto> ret = new ArrayList<>();
        Optional<List<Board>> data = boardRepository.findBoardByPidOrderByModDateDesc(pid);

        if(data.isPresent()){
            data.get().forEach(x->{
                try {
                    Optional<Member> member = memberRepository.findByUserId(x.getWriter());
                    ret.add(entityToDto(x, member.get()));
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            });
        }

        return ret;
    }

    public BoardDto getBoard(Long id) throws SQLException {
        BoardDto ret = new BoardDto();
        Optional<Board> data = boardRepository.findById(id);
        if(data.isPresent()){
            Optional<Member> member = memberRepository.findByUserId(data.get().getWriter());
            ret = entityToDto(data.get(), member.get());
        }
        return ret;
    }

    public void deleteBoard(Long id){
        Optional<Board> data = boardRepository.findById(id);
        data.ifPresent(x->{
            x.setDelYn("Y");
            boardRepository.save(x);
        });
    }

    public Long register(BoardDto dto) throws SQLException {
        Board board = DtoToEntity(dto);
        boardRepository.save(board);
        if(dto.getPid() != null){
            Optional<Board> pBoard = boardRepository.findBoardById(dto.getPid());
            pBoard.ifPresent(x->{
                x.setCmtCnt(dto.getCmt_cnt());
                boardRepository.save(x);
            });
        }
        if(!dto.getImage_ids().isEmpty()){
            Optional<List<BoardImages>> imgs = boardImagesRepository.findBoardImagesByBoardId(board.getId());
            imgs.ifPresent(x->{
                x.forEach(img->{
                    boardImagesRepository.delete(img);
                });
            });
            dto.getImage_ids().forEach(x->{
                boardImagesRepository.save(dtoToBoardImageEntity(x, board));
            });
        }

        return board.getId();
    }

    private BoardDto entityToDto(Board entity, Member member) throws SQLException {
        int len = (int)entity.getContents().length();
        byte[] bytes = entity.getContents().getBytes(1, len);
        String contents = new String(bytes);
        BoardDto dto = BoardDto.builder()
                .id(entity.getId())
                .pid(entity.getPid())
                .title(entity.getTitle())
                .contents(contents)
                .writer(entity.getWriter())
                .regdt(entity.getRegDate())
                .moddt(entity.getModDate())
                .biz_nm(member.getBizNm())
                .user_nm(member.getUserNm())
                .cmt_cnt(entity.getCmtCnt()).build();
        return dto;
    }

    private Board DtoToEntity(BoardDto dto) throws SQLException {
        byte[] bytes = dto.getContents().getBytes(StandardCharsets.UTF_8);
        Blob contents = new SerialBlob(bytes);

        Board entity = Board.builder()
                .pid(dto.getPid())
                .boardTyp(dto.getBoard_typ())
                .title(dto.getTitle())
                .contents(contents)
                .writer(dto.getWriter())
                .lockYn(dto.getLock_yn())
                .cmtCnt(dto.getCmt_cnt())
                .build();
        return entity;
    }

    private BoardImages dtoToBoardImageEntity(Long imageId, Board board){
        BoardImages entity = BoardImages.builder()
                .imageId(imageId)
                .board(board).build();
        return entity;
    }
}
