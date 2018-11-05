package com.linkder.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Language.
 */
@Entity
@Table(name = "language")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Language implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "version")
    private String version;

    @OneToMany(mappedBy = "language")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Framework> frameworks = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("languages")
    private Candidate candidate;

    @ManyToOne
    @JsonIgnoreProperties("languages")
    private Project project;

    @ManyToOne
    @JsonIgnoreProperties("languages")
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

    public Language name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public Language version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Set<Framework> getFrameworks() {
        return frameworks;
    }

    public Language frameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
        return this;
    }

    public Language addFramework(Framework framework) {
        this.frameworks.add(framework);
        framework.setLanguage(this);
        return this;
    }

    public Language removeFramework(Framework framework) {
        this.frameworks.remove(framework);
        framework.setLanguage(null);
        return this;
    }

    public void setFrameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public Language candidate(Candidate candidate) {
        this.candidate = candidate;
        return this;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public Project getProject() {
        return project;
    }

    public Language project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Position getPosition() {
        return position;
    }

    public Language position(Position position) {
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
        Language language = (Language) o;
        if (language.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), language.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Language{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", version='" + getVersion() + "'" +
            "}";
    }
}
