package com.nextgear.students.db;

import com.nextgear.students.model.Student;

/**
 * Exception thrown by service methods if {@link Student} object is invalid, i.e. has bad or
 * missing fields.
 *
 * @author Ryan Hardy
 */
@SuppressWarnings("unused")
public class InvalidStudentException extends Exception {
	private static final long serialVersionUID = -7248189648456807280L;

	public InvalidStudentException(final String message) {
		super(message);
	}

	public InvalidStudentException(final String message, final Throwable cause) {
		super(message, cause);
	}
}
