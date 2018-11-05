package com.linkder.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Match.
 */
@Entity
@Table(name = "match")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Match implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "candidate")
    private Long candidate;

    @Column(name = "candidate_bool")
    private Boolean candidateBool;

    @Column(name = "project")
    private Long project;

    @Column(name = "project_bool")
    private Boolean projectBool;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCandidate() {
        return candidate;
    }

    public Match candidate(Long candidate) {
        this.candidate = candidate;
        return this;
    }

    public void setCandidate(Long candidate) {
        this.candidate = candidate;
    }

    public Boolean isCandidateBool() {
        return candidateBool;
    }

    public Match candidateBool(Boolean candidateBool) {
        this.candidateBool = candidateBool;
        return this;
    }

    public void setCandidateBool(Boolean candidateBool) {
        this.candidateBool = candidateBool;
    }

    public Long getProject() {
        return project;
    }

    public Match project(Long project) {
        this.project = project;
        return this;
    }

    public void setProject(Long project) {
        this.project = project;
    }

    public Boolean isProjectBool() {
        return projectBool;
    }

    public Match projectBool(Boolean projectBool) {
        this.projectBool = projectBool;
        return this;
    }

    public void setProjectBool(Boolean projectBool) {
        this.projectBool = projectBool;
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
        Match match = (Match) o;
        if (match.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), match.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Match{" +
            "id=" + getId() +
            ", candidate=" + getCandidate() +
            ", candidateBool='" + isCandidateBool() + "'" +
            ", project=" + getProject() +
            ", projectBool='" + isProjectBool() + "'" +
            "}";
    }
}
