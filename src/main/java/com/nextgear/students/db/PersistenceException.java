package com.nextgear.students.db;

/**
 * Exception thrown by service methods if an system error occurs in performing persistence operation.
 *
 * @author Ryan Hardy
 */
@SuppressWarnings("unused")
public class PersistenceException extends Exception {
	private static final long serialVersionUID = -1479213302345826620L;

	public PersistenceException(final String message) {
		super(message);
	}

	public PersistenceException(final String message, final Throwable cause) {
		super(message, cause);
	}
}
