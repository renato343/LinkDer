package com.linkder.service;

import com.linkder.domain.Location;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Location.
 */
public interface LocationService {

    /**
     * Save a location.
     *
     * @param location the entity to save
     * @return the persisted entity
     */
    Location save(Location location);

    /**
     * Get all the locations.
     *
     * @return the list of entities
     */
    List<Location> findAll();
    /**
     * Get all the LocationDTO where Candidate is null.
     *
     * @return the list of entities
     */
    List<Location> findAllWhereCandidateIsNull();
    /**
     * Get all the LocationDTO where Company is null.
     *
     * @return the list of entities
     */
    List<Location> findAllWhereCompanyIsNull();
    /**
     * Get all the LocationDTO where Project is null.
     *
     * @return the list of entities
     */
    List<Location> findAllWhereProjectIsNull();
    /**
     * Get all the LocationDTO where Position is null.
     *
     * @return the list of entities
     */
    List<Location> findAllWherePositionIsNull();


    /**
     * Get the "id" location.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Location> findOne(Long id);

    /**
     * Delete the "id" location.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
