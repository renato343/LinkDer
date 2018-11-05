package com.linkder.service.impl;

import com.linkder.service.LocationService;
import com.linkder.domain.Location;
import com.linkder.repository.LocationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Location.
 */
@Service
@Transactional
public class LocationServiceImpl implements LocationService {

    private final Logger log = LoggerFactory.getLogger(LocationServiceImpl.class);

    private final LocationRepository locationRepository;

    public LocationServiceImpl(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    /**
     * Save a location.
     *
     * @param location the entity to save
     * @return the persisted entity
     */
    @Override
    public Location save(Location location) {
        log.debug("Request to save Location : {}", location);
        return locationRepository.save(location);
    }

    /**
     * Get all the locations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Location> findAll() {
        log.debug("Request to get all Locations");
        return locationRepository.findAll();
    }



    /**
     *  get all the locations where Candidate is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Location> findAllWhereCandidateIsNull() {
        log.debug("Request to get all locations where Candidate is null");
        return StreamSupport
            .stream(locationRepository.findAll().spliterator(), false)
            .filter(location -> location.getCandidate() == null)
            .collect(Collectors.toList());
    }


    /**
     *  get all the locations where Company is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Location> findAllWhereCompanyIsNull() {
        log.debug("Request to get all locations where Company is null");
        return StreamSupport
            .stream(locationRepository.findAll().spliterator(), false)
            .filter(location -> location.getCompany() == null)
            .collect(Collectors.toList());
    }


    /**
     *  get all the locations where Project is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Location> findAllWhereProjectIsNull() {
        log.debug("Request to get all locations where Project is null");
        return StreamSupport
            .stream(locationRepository.findAll().spliterator(), false)
            .filter(location -> location.getProject() == null)
            .collect(Collectors.toList());
    }


    /**
     *  get all the locations where Position is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Location> findAllWherePositionIsNull() {
        log.debug("Request to get all locations where Position is null");
        return StreamSupport
            .stream(locationRepository.findAll().spliterator(), false)
            .filter(location -> location.getPosition() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one location by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Location> findOne(Long id) {
        log.debug("Request to get Location : {}", id);
        return locationRepository.findById(id);
    }

    /**
     * Delete the location by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Location : {}", id);
        locationRepository.deleteById(id);
    }
}
