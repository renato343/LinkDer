package com.linkder.service;

import com.linkder.domain.Framework;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Framework.
 */
public interface FrameworkService {

    /**
     * Save a framework.
     *
     * @param framework the entity to save
     * @return the persisted entity
     */
    Framework save(Framework framework);

    /**
     * Get all the frameworks.
     *
     * @return the list of entities
     */
    List<Framework> findAll();


    /**
     * Get the "id" framework.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Framework> findOne(Long id);

    /**
     * Delete the "id" framework.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
