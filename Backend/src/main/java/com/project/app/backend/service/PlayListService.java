package com.project.app.backend.service;

import com.project.app.backend.dto.PlayListDto;
import com.project.app.backend.entity.PlayList;
import com.project.app.backend.entity.Song;
import com.project.app.backend.entity.SongToPlaylist;
import com.project.app.backend.repository.PlayListRepository;
import com.project.app.backend.repository.SongReporitory;
import com.project.app.backend.repository.SongToPlayListRespository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlayListService {

    private final PlayListRepository playListRepository;
    private final SongReporitory songRepository;
    private final SongToPlayListRespository songToPlayListRepository;

    @Transactional
    public PlayList createPlayList(PlayListDto dto) {
        if (dto == null || dto.getSongIds() == null) {
            throw new IllegalArgumentException("PlayList data is invalid");
        }

        List<Song> songs = songRepository.findAllById(dto.getSongIds());
        if (songs.size() != dto.getSongIds().size()) {
            throw new IllegalArgumentException("Some songs were not found");
        }

        double totalDuration = songs.stream()
            .mapToDouble(Song::getDuration)
            .sum();

        PlayList playList = new PlayList();
        playList.setName(dto.getName());
        playList.setDescription(dto.getDescription());
        playList.setDuration(totalDuration);

        PlayList savedPlayList = playListRepository.save(playList);

        songs.forEach(song -> {
            SongToPlaylist relation = new SongToPlaylist();
            relation.setPlaylist(savedPlayList);
            relation.setSong(song);
            songToPlayListRepository.save(relation);
        });

        return savedPlayList;
    }

    public List<PlayList> getAllPlayLists() {
        return playListRepository.findAll();
    }

    public Optional<PlayList>  getPlayListById(Long id){
        return  playListRepository.findById(id);
    }
}
