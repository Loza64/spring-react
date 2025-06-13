package com.project.app.backend.service;

import com.project.app.backend.dto.SongDto;
import com.project.app.backend.entity.Song;
import com.project.app.backend.repository.SongReporitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {
    private final SongReporitory songRepository;
    @Autowired
    public SongService(SongReporitory songRepository) {
        this.songRepository = songRepository;
    }

    public Song createSong(SongDto dto) {
        Song song = new Song();
        song.setArtist(dto.getArtist());
        song.setName(dto.getName());
        song.setDuration(dto.getDuration());
        return songRepository.save(song);
    }

    public List<Song> getSongList(){
        return  songRepository.findAll();
    }
}