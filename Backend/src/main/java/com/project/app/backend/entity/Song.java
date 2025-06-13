package com.project.app.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "song")
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String artist;

     @Column(nullable = false,unique = true)
    private String name;

    @Column(nullable = false)
    private  Double duration;

    @OneToMany(mappedBy = "song", cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<SongToPlaylist> playlistsSongs;

}
