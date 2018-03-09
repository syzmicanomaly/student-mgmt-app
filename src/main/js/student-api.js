const
    $     = require("jquery"),
    Utils = require("./utils")
;

const StudentApi = {};

StudentApi.getAllStudents = function () {
    return $.ajax({
        url: "/student/all",
        method: "GET"
    });
};

StudentApi.createStudent = function (student) {
    return $.ajax({
        url: "/student/create",
        method: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(student)
    });
};

StudentApi.deleteStudent = function (student) {
    student || Utils.die("Can not delete student, student object is null");

    return $.ajax({
        url: "/student/delete/" + student.id,
        method: "DELETE"
    });
};

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