const
    $     = require("jquery"),
    Utils = require("./utils")
;

const StudentApi = {};

/**
 * Executes API call to fetch all students.
 *
 * @return {Promise}
 */
StudentApi.getAllStudents = function () {
    return $.ajax({
        url: "/student/all",
        method: "GET"
    });
};

/**
 * Executes API call to create new student.
 *
 * @param student
 * @return {Promise}
 */
StudentApi.createStudent = function (student) {
    return $.ajax({
        url: "/student/create",
        method: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(student)
    });
};

/**
 * Executes API call to delete student.
 *
 * @param student
 * @return {Promise}
 */
StudentApi.deleteStudent = function (student) {
    student || Utils.die("Can not delete student, student object is null");

    return $.ajax({
        url: "/student/delete/" + student.id,
        method: "DELETE"
    });
};

/**
 * Executes API call to update existing student.
 *
 * @param student
 * @return {Promise}
 */
StudentApi.updateStudent = function (student) {
    return $.ajax({
        url: "/student/update",
        method: "PUT",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(student)
    });
};

module.exports = Object.freeze(StudentApi);