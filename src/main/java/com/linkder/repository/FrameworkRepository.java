package com.linkder.repository;

import com.linkder.domain.Framework;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Framework entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FrameworkRepository extends JpaRepository<Framework, Long> {

}
