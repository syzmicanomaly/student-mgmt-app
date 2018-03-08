const
    $     = require("jquery"),
    Utils = require("./utils")
;

const StudentApi = {};

function convertDate(birthDate) {
    return "1976-08-08";
}

StudentApi.getAllStudents = function () {
    return $.ajax({
        url: "/student/all",
        method: "GET"/*,
        dataFilter: function (students) {
            const json = JSON.parse(students);
            $.each(json, function (i, student) {
                student.birthDate = convertDate(student.birthDate);
            });
            return JSON.stringify(json);
        }
*/    });
};

StudentApi.createStudent = function (student) {
    return $.ajax({
        url: "/student/create",
        method: "POST",
        data: student
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