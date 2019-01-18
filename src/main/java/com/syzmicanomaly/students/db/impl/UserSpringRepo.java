package com.syzmicanomaly.students.db.impl;

import com.syzmicanomaly.students.model.Student;
import org.springframework.data.repository.CrudRepository;

/**
 * Spring CRUD repo for Student DB operations.
 *
 * @author Ryan Hardy
 */
public interface UserSpringRepo extends CrudRepository<Student, Long> {
}
