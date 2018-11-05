package com.linkder.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.linkder.domain.Framework;
import com.linkder.service.FrameworkService;
import com.linkder.web.rest.errors.BadRequestAlertException;
import com.linkder.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Framework.
 */
@RestController
@RequestMapping("/api")
public class FrameworkResource {

    private final Logger log = LoggerFactory.getLogger(FrameworkResource.class);

    private static final String ENTITY_NAME = "framework";

    private final FrameworkService frameworkService;

    public FrameworkResource(FrameworkService frameworkService) {
        this.frameworkService = frameworkService;
    }

    /**
     * POST  /frameworks : Create a new framework.
     *
     * @param framework the framework to create
     * @return the ResponseEntity with status 201 (Created) and with body the new framework, or with status 400 (Bad Request) if the framework has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/frameworks")
    @Timed
    public ResponseEntity<Framework> createFramework(@RequestBody Framework framework) throws URISyntaxException {
        log.debug("REST request to save Framework : {}", framework);
        if (framework.getId() != null) {
            throw new BadRequestAlertException("A new framework cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Framework result = frameworkService.save(framework);
        return ResponseEntity.created(new URI("/api/frameworks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /frameworks : Updates an existing framework.
     *
     * @param framework the framework to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated framework,
     * or with status 400 (Bad Request) if the framework is not valid,
     * or with status 500 (Internal Server Error) if the framework couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/frameworks")
    @Timed
    public ResponseEntity<Framework> updateFramework(@RequestBody Framework framework) throws URISyntaxException {
        log.debug("REST request to update Framework : {}", framework);
        if (framework.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Framework result = frameworkService.save(framework);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, framework.getId().toString()))
            .body(result);
    }

    /**
     * GET  /frameworks : get all the frameworks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of frameworks in body
     */
    @GetMapping("/frameworks")
    @Timed
    public List<Framework> getAllFrameworks() {
        log.debug("REST request to get all Frameworks");
        return frameworkService.findAll();
    }

    /**
     * GET  /frameworks/:id : get the "id" framework.
     *
     * @param id the id of the framework to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the framework, or with status 404 (Not Found)
     */
    @GetMapping("/frameworks/{id}")
    @Timed
    public ResponseEntity<Framework> getFramework(@PathVariable Long id) {
        log.debug("REST request to get Framework : {}", id);
        Optional<Framework> framework = frameworkService.findOne(id);
        return ResponseUtil.wrapOrNotFound(framework);
    }

    /**
     * DELETE  /frameworks/:id : delete the "id" framework.
     *
     * @param id the id of the framework to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/frameworks/{id}")
    @Timed
    public ResponseEntity<Void> deleteFramework(@PathVariable Long id) {
        log.debug("REST request to delete Framework : {}", id);
        frameworkService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
