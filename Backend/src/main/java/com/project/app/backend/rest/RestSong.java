package com.project.app.backend.rest;

import com.project.app.backend.dto.SongDto;
import com.project.app.backend.entity.Song;
import com.project.app.backend.service.SongService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/song", produces = "application/json")
@RestController()
public class RestSong {

    private  final SongService songService;

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
    public ResponseEntity<Object> newSong(@RequestBody @Valid SongDto dto){
        Song response =  songService.createSong(dto);
        if(response != null){
            return buildResponse(HttpStatus.CREATED.value(), "Song created", response);
        }else{
            return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Song created ERROR", null);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Object> list(){
        List<Song> response = songService.getSongList();
        if(!response.isEmpty()){
              return buildResponse(HttpStatus.CREATED.value(), "Song list", response);
        }else{
              return buildResponse(HttpStatus.NOT_FOUND.value(), "Song list empty", null);
        }
    }
}
