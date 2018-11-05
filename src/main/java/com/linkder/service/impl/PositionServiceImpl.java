package com.linkder.service.impl;

import com.linkder.service.PositionService;
import com.linkder.domain.Position;
import com.linkder.repository.PositionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Position.
 */
@Service
@Transactional
public class PositionServiceImpl implements PositionService {

    private final Logger log = LoggerFactory.getLogger(PositionServiceImpl.class);

    private final PositionRepository positionRepository;

    public PositionServiceImpl(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    /**
     * Save a position.
     *
     * @param position the entity to save
     * @return the persisted entity
     */
    @Override
    public Position save(Position position) {
        log.debug("Request to save Position : {}", position);
        return positionRepository.save(position);
    }

    /**
     * Get all the positions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Position> findAll() {
        log.debug("Request to get all Positions");
        return positionRepository.findAll();
    }


    /**
     * Get one position by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Position> findOne(Long id) {
        log.debug("Request to get Position : {}", id);
        return positionRepository.findById(id);
    }

    /**
     * Delete the position by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Position : {}", id);
        positionRepository.deleteById(id);
    }
}
