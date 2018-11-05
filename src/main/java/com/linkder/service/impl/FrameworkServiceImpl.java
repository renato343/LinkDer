package com.linkder.service.impl;

import com.linkder.service.FrameworkService;
import com.linkder.domain.Framework;
import com.linkder.repository.FrameworkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Framework.
 */
@Service
@Transactional
public class FrameworkServiceImpl implements FrameworkService {

    private final Logger log = LoggerFactory.getLogger(FrameworkServiceImpl.class);

    private final FrameworkRepository frameworkRepository;

    public FrameworkServiceImpl(FrameworkRepository frameworkRepository) {
        this.frameworkRepository = frameworkRepository;
    }

    /**
     * Save a framework.
     *
     * @param framework the entity to save
     * @return the persisted entity
     */
    @Override
    public Framework save(Framework framework) {
        log.debug("Request to save Framework : {}", framework);
        return frameworkRepository.save(framework);
    }

    /**
     * Get all the frameworks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Framework> findAll() {
        log.debug("Request to get all Frameworks");
        return frameworkRepository.findAll();
    }


    /**
     * Get one framework by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Framework> findOne(Long id) {
        log.debug("Request to get Framework : {}", id);
        return frameworkRepository.findById(id);
    }

    /**
     * Delete the framework by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Framework : {}", id);
        frameworkRepository.deleteById(id);
    }
}
