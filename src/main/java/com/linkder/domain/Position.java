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
 * A Position.
 */
@Entity
@Table(name = "position")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Position implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "min_salary")
    private Long minSalary;

    @Column(name = "max_salary")
    private Long maxSalary;

    @OneToOne    @JoinColumn(unique = true)
    private Location location;

    @OneToMany(mappedBy = "position")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Language> languages = new HashSet<>();
    @OneToMany(mappedBy = "position")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Framework> frameworks = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("positions")
    private Project project;

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

    public Position name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public Position type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getMinSalary() {
        return minSalary;
    }

    public Position minSalary(Long minSalary) {
        this.minSalary = minSalary;
        return this;
    }

    public void setMinSalary(Long minSalary) {
        this.minSalary = minSalary;
    }

    public Long getMaxSalary() {
        return maxSalary;
    }

    public Position maxSalary(Long maxSalary) {
        this.maxSalary = maxSalary;
        return this;
    }

    public void setMaxSalary(Long maxSalary) {
        this.maxSalary = maxSalary;
    }

    public Location getLocation() {
        return location;
    }

    public Position location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public Position languages(Set<Language> languages) {
        this.languages = languages;
        return this;
    }

    public Position addLanguage(Language language) {
        this.languages.add(language);
        language.setPosition(this);
        return this;
    }

    public Position removeLanguage(Language language) {
        this.languages.remove(language);
        language.setPosition(null);
        return this;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public Set<Framework> getFrameworks() {
        return frameworks;
    }

    public Position frameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
        return this;
    }

    public Position addFramework(Framework framework) {
        this.frameworks.add(framework);
        framework.setPosition(this);
        return this;
    }

    public Position removeFramework(Framework framework) {
        this.frameworks.remove(framework);
        framework.setPosition(null);
        return this;
    }

    public void setFrameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
    }

    public Project getProject() {
        return project;
    }

    public Position project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
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
        Position position = (Position) o;
        if (position.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), position.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Position{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", minSalary=" + getMinSalary() +
            ", maxSalary=" + getMaxSalary() +
            "}";
    }
}
