package com.syzmicanomaly.students.db;

import com.syzmicanomaly.students.model.Student;

/**
 * Exception thrown by creational service methods if {@link Student} already exists in system.
 *
 * @author Ryan Hardy
 */
@SuppressWarnings("unused")
public class StudentAlreadyExistsException extends Exception {
	private static final long serialVersionUID = 2035080425171952512L;

	public StudentAlreadyExistsException(final String message) {
		super(message);
	}

	public StudentAlreadyExistsException(final String message, final Throwable cause) {
		super(message, cause);
	}
}
