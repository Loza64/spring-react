package com.project.app.backend.repository;

import com.project.app.backend.entity.PlayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface PlayListRepository extends JpaRepository<PlayList, Long> {

}
