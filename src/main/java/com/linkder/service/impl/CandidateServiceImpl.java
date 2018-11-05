package com.linkder.service.impl;

import com.linkder.service.CandidateService;
import com.linkder.domain.Candidate;
import com.linkder.repository.CandidateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Candidate.
 */
@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {

    private final Logger log = LoggerFactory.getLogger(CandidateServiceImpl.class);

    private final CandidateRepository candidateRepository;

    public CandidateServiceImpl(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    /**
     * Save a candidate.
     *
     * @param candidate the entity to save
     * @return the persisted entity
     */
    @Override
    public Candidate save(Candidate candidate) {
        log.debug("Request to save Candidate : {}", candidate);
        return candidateRepository.save(candidate);
    }

    /**
     * Get all the candidates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Candidate> findAll() {
        log.debug("Request to get all Candidates");
        return candidateRepository.findAll();
    }


    /**
     * Get one candidate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Candidate> findOne(Long id) {
        log.debug("Request to get Candidate : {}", id);
        return candidateRepository.findById(id);
    }

    /**
     * Delete the candidate by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Candidate : {}", id);
        candidateRepository.deleteById(id);
    }
}
