package com.linkder.web.rest;

import com.linkder.LinkderApp;

import com.linkder.domain.Framework;
import com.linkder.repository.FrameworkRepository;
import com.linkder.service.FrameworkService;
import com.linkder.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.linkder.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FrameworkResource REST controller.
 *
 * @see FrameworkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LinkderApp.class)
public class FrameworkResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    @Autowired
    private FrameworkRepository frameworkRepository;

    @Autowired
    private FrameworkService frameworkService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFrameworkMockMvc;

    private Framework framework;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FrameworkResource frameworkResource = new FrameworkResource(frameworkService);
        this.restFrameworkMockMvc = MockMvcBuilders.standaloneSetup(frameworkResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Framework createEntity(EntityManager em) {
        Framework framework = new Framework()
            .name(DEFAULT_NAME)
            .version(DEFAULT_VERSION);
        return framework;
    }

    @Before
    public void initTest() {
        framework = createEntity(em);
    }

    @Test
    @Transactional
    public void createFramework() throws Exception {
        int databaseSizeBeforeCreate = frameworkRepository.findAll().size();

        // Create the Framework
        restFrameworkMockMvc.perform(post("/api/frameworks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(framework)))
            .andExpect(status().isCreated());

        // Validate the Framework in the database
        List<Framework> frameworkList = frameworkRepository.findAll();
        assertThat(frameworkList).hasSize(databaseSizeBeforeCreate + 1);
        Framework testFramework = frameworkList.get(frameworkList.size() - 1);
        assertThat(testFramework.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFramework.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    @Transactional
    public void createFrameworkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = frameworkRepository.findAll().size();

        // Create the Framework with an existing ID
        framework.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFrameworkMockMvc.perform(post("/api/frameworks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(framework)))
            .andExpect(status().isBadRequest());

        // Validate the Framework in the database
        List<Framework> frameworkList = frameworkRepository.findAll();
        assertThat(frameworkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFrameworks() throws Exception {
        // Initialize the database
        frameworkRepository.saveAndFlush(framework);

        // Get all the frameworkList
        restFrameworkMockMvc.perform(get("/api/frameworks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(framework.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())));
    }
    
    @Test
    @Transactional
    public void getFramework() throws Exception {
        // Initialize the database
        frameworkRepository.saveAndFlush(framework);

        // Get the framework
        restFrameworkMockMvc.perform(get("/api/frameworks/{id}", framework.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(framework.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFramework() throws Exception {
        // Get the framework
        restFrameworkMockMvc.perform(get("/api/frameworks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFramework() throws Exception {
        // Initialize the database
        frameworkService.save(framework);

        int databaseSizeBeforeUpdate = frameworkRepository.findAll().size();

        // Update the framework
        Framework updatedFramework = frameworkRepository.findById(framework.getId()).get();
        // Disconnect from session so that the updates on updatedFramework are not directly saved in db
        em.detach(updatedFramework);
        updatedFramework
            .name(UPDATED_NAME)
            .version(UPDATED_VERSION);

        restFrameworkMockMvc.perform(put("/api/frameworks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFramework)))
            .andExpect(status().isOk());

        // Validate the Framework in the database
        List<Framework> frameworkList = frameworkRepository.findAll();
        assertThat(frameworkList).hasSize(databaseSizeBeforeUpdate);
        Framework testFramework = frameworkList.get(frameworkList.size() - 1);
        assertThat(testFramework.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFramework.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void updateNonExistingFramework() throws Exception {
        int databaseSizeBeforeUpdate = frameworkRepository.findAll().size();

        // Create the Framework

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFrameworkMockMvc.perform(put("/api/frameworks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(framework)))
            .andExpect(status().isBadRequest());

        // Validate the Framework in the database
        List<Framework> frameworkList = frameworkRepository.findAll();
        assertThat(frameworkList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFramework() throws Exception {
        // Initialize the database
        frameworkService.save(framework);

        int databaseSizeBeforeDelete = frameworkRepository.findAll().size();

        // Get the framework
        restFrameworkMockMvc.perform(delete("/api/frameworks/{id}", framework.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Framework> frameworkList = frameworkRepository.findAll();
        assertThat(frameworkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Framework.class);
        Framework framework1 = new Framework();
        framework1.setId(1L);
        Framework framework2 = new Framework();
        framework2.setId(framework1.getId());
        assertThat(framework1).isEqualTo(framework2);
        framework2.setId(2L);
        assertThat(framework1).isNotEqualTo(framework2);
        framework1.setId(null);
        assertThat(framework1).isNotEqualTo(framework2);
    }
}
