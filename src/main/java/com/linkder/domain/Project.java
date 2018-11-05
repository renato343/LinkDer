package com.linkder.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "project_name", nullable = false)
    private String projectName;

    @OneToOne    @JoinColumn(unique = true)
    private Location location;

    @OneToMany(mappedBy = "project")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Language> languages = new HashSet<>();
    @OneToMany(mappedBy = "project")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Framework> frameworks = new HashSet<>();
    @OneToMany(mappedBy = "project")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Position> positions = new HashSet<>();
    @OneToOne(mappedBy = "project")
    @JsonIgnore
    private Candidate candidate;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public Project projectName(String projectName) {
        this.projectName = projectName;
        return this;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public Location getLocation() {
        return location;
    }

    public Project location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public Project languages(Set<Language> languages) {
        this.languages = languages;
        return this;
    }

    public Project addLanguage(Language language) {
        this.languages.add(language);
        language.setProject(this);
        return this;
    }

    public Project removeLanguage(Language language) {
        this.languages.remove(language);
        language.setProject(null);
        return this;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public Set<Framework> getFrameworks() {
        return frameworks;
    }

    public Project frameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
        return this;
    }

    public Project addFramework(Framework framework) {
        this.frameworks.add(framework);
        framework.setProject(this);
        return this;
    }

    public Project removeFramework(Framework framework) {
        this.frameworks.remove(framework);
        framework.setProject(null);
        return this;
    }

    public void setFrameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
    }

    public Set<Position> getPositions() {
        return positions;
    }

    public Project positions(Set<Position> positions) {
        this.positions = positions;
        return this;
    }

    public Project addPosition(Position position) {
        this.positions.add(position);
        position.setProject(this);
        return this;
    }

    public Project removePosition(Position position) {
        this.positions.remove(position);
        position.setProject(null);
        return this;
    }

    public void setPositions(Set<Position> positions) {
        this.positions = positions;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public Project candidate(Candidate candidate) {
        this.candidate = candidate;
        return this;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public Company getCompany() {
        return company;
    }

    public Project company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Project project = (Project) o;
        if (project.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), project.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", projectName='" + getProjectName() + "'" +
            "}";
    }
}
