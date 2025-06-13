package com.project.app.backend.rest;

import com.project.app.backend.dto.PlayListDto;
import com.project.app.backend.entity.PlayList;
import com.project.app.backend.service.PlayListService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/playlist", produces = "application/json")
@RestController()
public class RestPlayList {

    private final PlayListService playListService;

    private ResponseEntity<Object> buildResponse(int status, String message, Object data) {
        boolean state = status >= 200 && status <= 299;
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("state", state);
        response.put("message", message);
        if (data != null) {
            response.put("result", data);
        }
        return ResponseEntity.status(status).body(response);
    }

    @PostMapping("/")
    public ResponseEntity<Object> newPlayList(@RequestBody @Valid PlayListDto dto){
        PlayList response = playListService.createPlayList(dto);
        if(response != null){
            return  buildResponse(HttpStatus.CREATED.value(), "Song created success", response);
        }else{
            return  buildResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Song created error", null);
        }
    }

    @GetMapping("/")
    ResponseEntity<Object>  getList (){
        List<PlayList> list = playListService.getAllPlayLists();
        if(list.size() > 0){
            return  buildResponse(HttpStatus.OK.value(), "song list", list);
        }else{
            return  buildResponse(HttpStatus.NOT_FOUND.value(), "songs not found", null);
        }
    }

 @GetMapping("/{id}")
public ResponseEntity<Object> getPlayList(@PathVariable("id") Long id) {
    return playListService.getPlayListById(id)
            .map(playList -> buildResponse(HttpStatus.OK.value(), "Playlist encontrada", playList))
            .orElseGet(() -> buildResponse(HttpStatus.NOT_FOUND.value(), "Playlist no encontrada con ID: " + id, null));
}
}
