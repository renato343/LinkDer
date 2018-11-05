package com.linkder.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Candidate.
 */
@Entity
@Table(name = "candidate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Candidate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @NotNull
    @Column(name = "skype", nullable = false)
    private String skype;

    @NotNull
    @Column(name = "linkdin", nullable = false)
    private String linkdin;

    @Column(name = "salary")
    private Long salary;

    @OneToOne    @JoinColumn(unique = true)
    private Project project;

    @OneToOne    @JoinColumn(unique = true)
    private Location location;

    @OneToMany(mappedBy = "candidate")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Language> languages = new HashSet<>();
    @OneToMany(mappedBy = "candidate")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Framework> frameworks = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Candidate firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Candidate lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Candidate email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Candidate phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSkype() {
        return skype;
    }

    public Candidate skype(String skype) {
        this.skype = skype;
        return this;
    }

    public void setSkype(String skype) {
        this.skype = skype;
    }

    public String getLinkdin() {
        return linkdin;
    }

    public Candidate linkdin(String linkdin) {
        this.linkdin = linkdin;
        return this;
    }

    public void setLinkdin(String linkdin) {
        this.linkdin = linkdin;
    }

    public Long getSalary() {
        return salary;
    }

    public Candidate salary(Long salary) {
        this.salary = salary;
        return this;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public Project getProject() {
        return project;
    }

    public Candidate project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Location getLocation() {
        return location;
    }

    public Candidate location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public Candidate languages(Set<Language> languages) {
        this.languages = languages;
        return this;
    }

    public Candidate addLanguage(Language language) {
        this.languages.add(language);
        language.setCandidate(this);
        return this;
    }

    public Candidate removeLanguage(Language language) {
        this.languages.remove(language);
        language.setCandidate(null);
        return this;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public Set<Framework> getFrameworks() {
        return frameworks;
    }

    public Candidate frameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
        return this;
    }

    public Candidate addFramework(Framework framework) {
        this.frameworks.add(framework);
        framework.setCandidate(this);
        return this;
    }

    public Candidate removeFramework(Framework framework) {
        this.frameworks.remove(framework);
        framework.setCandidate(null);
        return this;
    }

    public void setFrameworks(Set<Framework> frameworks) {
        this.frameworks = frameworks;
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
        Candidate candidate = (Candidate) o;
        if (candidate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), candidate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Candidate{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", skype='" + getSkype() + "'" +
            ", linkdin='" + getLinkdin() + "'" +
            ", salary=" + getSalary() +
            "}";
    }
}
