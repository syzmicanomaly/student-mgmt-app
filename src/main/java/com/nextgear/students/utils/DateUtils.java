package com.nextgear.students.utils;

import org.springframework.util.Assert;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * Static utility methods for performing Date conversions.
 *
 * @author Ryan Hardy
 */
public final class DateUtils {

	private DateUtils() {
		throw new UnsupportedOperationException("Can't instantiate this class");
	}

	// taken and adapted from:
	// 		https://stackoverflow.com/questions/22929237/convert-java-time-localdate-into-java-util-date-type

	public static Date asDate(final LocalDate localDate) {
		Assert.notNull(localDate, "The LocalDate is required");
		return Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
	}

	public static Date asDate(final LocalDateTime localDateTime) {
		Assert.notNull(localDateTime, "The LocalDateTime is required");
		return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
	}

	public static LocalDate asLocalDate(final Date date) {
		Assert.notNull(date, "The Date is required");
		return Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
	}

	public static LocalDateTime asLocalDateTime(final Date date) {
		Assert.notNull(date, "The Date is required");
		return Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDateTime();
	}
}
