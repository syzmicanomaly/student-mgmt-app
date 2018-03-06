package com.nextgear.students.db.impl;

import com.nextgear.students.model.Student;
import org.springframework.data.repository.CrudRepository;

/**
 * @author Ryan Hardy
 */
public interface UserSpringRepo extends CrudRepository<Student, Long> {
}
