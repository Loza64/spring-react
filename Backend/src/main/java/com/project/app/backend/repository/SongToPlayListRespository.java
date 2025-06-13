package com.project.app.backend.repository;

import com.project.app.backend.entity.SongToPlaylist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface SongToPlayListRespository extends JpaRepository<SongToPlaylist, Long> {
}
