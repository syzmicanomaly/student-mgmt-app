package com.nextgear.students.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nextgear.students.utils.DateUtils;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

/**
 * @author Ryan Hardy
 */
@Entity
@Table(name = "student")
@SuppressWarnings({"WeakerAccess", "unused"})
public class Student {

	@Id
	@GeneratedValue
	@Column(name = "student_id", nullable = false)
	private Long id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false, name = "first_name")
	private String firstName;

	@Column(nullable = false, name = "last_name")
	private String lastName;

	@Column(nullable = false, name = "birth_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss", timezone = "UTC")
	private Date birthDate;

	public Student() {
		// default no-arg constructor
	}

	public Student(final String email, final String firstName, final String lastName, final Date birthDate) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = birthDate;
	}

	public Student(final String email, final String firstName, final String lastName, final LocalDate birthDate) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthDate = DateUtils.asDate(birthDate);
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(final String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(final String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(final String lastName) {
		this.lastName = lastName;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(final Date birthDate) {
		this.birthDate = birthDate;
	}

	@Override
	public String toString() {
		final StringBuilder bldr = new StringBuilder();
		if (StringUtils.isNotBlank(getFirstName())) {
			bldr.append(getFirstName()).append(" ");
		}
		if (StringUtils.isNotBlank(getLastName())) {
			bldr.append(getLastName()).append(" ");
		}
		bldr.append("(").append(getEmail()).append(")");
		return bldr.toString();
	}

	@Override
	public boolean equals(final Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Student)) {
			return false;
		}
		final Student student = (Student) o;
		// student is unique based on email
		return Objects.equals(getEmail(), student.getEmail());
	}

	@Override
	public int hashCode() {
		// student is unique based on email
		return Objects.hash(getEmail());
	}
}
