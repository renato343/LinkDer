package com.linkder.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Framework.
 */
@Entity
@Table(name = "framework")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Framework implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "version")
    private String version;

    @ManyToOne
    @JsonIgnoreProperties("frameworks")
    private Candidate candidate;

    @ManyToOne
    @JsonIgnoreProperties("frameworks")
    private Project project;

    @ManyToOne
    @JsonIgnoreProperties("frameworks")
    private Language language;

    @ManyToOne
    @JsonIgnoreProperties("frameworks")
    private Position position;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Framework name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public Framework version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public Framework candidate(Candidate candidate) {
        this.candidate = candidate;
        return this;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public Project getProject() {
        return project;
    }

    public Framework project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Language getLanguage() {
        return language;
    }

    public Framework language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Position getPosition() {
        return position;
    }

    public Framework position(Position position) {
        this.position = position;
        return this;
    }

    public void setPosition(Position position) {
        this.position = position;
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
        Framework framework = (Framework) o;
        if (framework.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), framework.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Framework{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", version='" + getVersion() + "'" +
            "}";
    }
}
