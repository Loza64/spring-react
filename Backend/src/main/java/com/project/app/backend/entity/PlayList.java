package com.project.app.backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "playlist")
public class PlayList {
    @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private  Double duration;

     @OneToMany(mappedBy = "playlist", cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
     @JsonIgnore
     private List<SongToPlaylist> playlistsSongs;

     @Transient
    @JsonProperty("songs")
    public List<Song> getSongs() {
        if (playlistsSongs == null) {
            return List.of();
        }
        return playlistsSongs.stream()
                .map(SongToPlaylist::getSong)
                .collect(Collectors.toList());
    }
}
