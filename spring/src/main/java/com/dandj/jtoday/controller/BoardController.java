package com.dandj.jtoday.controller;

import com.dandj.jtoday.dto.comm.BoardDto;
import com.dandj.jtoday.service.func.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.SQLException;
import java.util.List;

@Controller
@Log4j2
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping({"/list", "/write", "/detail", "/qna"})
    public void View(){
    }

    @PostMapping("/register")
    public ResponseEntity<Long> register(BoardDto dto) throws SQLException {
        return new ResponseEntity<>(boardService.register(dto), HttpStatus.OK);
    }

    @GetMapping("/getList")
    public ResponseEntity<List<BoardDto>> getList(int sttPage, int perPage, String typ, String searchTyp, String searchVal){
        return new ResponseEntity<>(boardService.getList(sttPage, perPage, typ, searchTyp, searchVal), HttpStatus.OK);
    }
    @GetMapping("/getComments")
    public ResponseEntity<List<BoardDto>> getComments(Long id){
        return new ResponseEntity<>(boardService.getComments(id), HttpStatus.OK);
    }
    @GetMapping("/getBoard")
    public ResponseEntity<BoardDto> getBoard(Long id) throws SQLException {
        return new ResponseEntity<>(boardService.getBoard(id), HttpStatus.OK);
    }
    @GetMapping("/deleteBoard")
    public ResponseEntity<String> deleteBoard(Long id){
        boardService.deleteBoard(id);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
