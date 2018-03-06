package com.nextgear.students.app;

/**
 * Exception thrown by service methods if an error occurs in performing persistence operation.
 *
 * @author Ryan Hardy
 */
public class PersistenceException extends Exception {
	private static final long serialVersionUID = -1479213302345826620L;

	public PersistenceException(final String message) {
		super(message);
	}

	public PersistenceException(final String message, final Throwable cause) {
		super(message, cause);
	}
}
