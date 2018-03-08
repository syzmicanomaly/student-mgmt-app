const
    React          = require("react"),
    StudentDetails = require("./student-details.jsx")
;

class StudentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const
            students = this.props.students,
            showEdit = this.props.showEdit,
            showDelete = this.props.showDelete
        ;
        return (
            <div className={'container student-list'} style={{width: '100%'}}>
                <div className={'row student-detail-header'}>
                    <div className={'student-header-cell col-md-2'}>First Name</div>
                    <div className={'student-header-cell col-md-2'}>Last Name</div>
                    <div className={'student-header-cell col-md-3'}>Email</div>
                    <div className={'student-header-cell col-md-3'}>Birthdate</div>
                    <div className={'student-header-cell col-md-2'}>&nbsp;</div>
                </div>
                {students.map((student) =>
                    <StudentDetails
                        key={student.id}
                        student={student}
                        editStudent={() => { showEdit(student) }}
                        deleteStudent={() => { showDelete(student)}} />
                )}
            </div>
        )
    }
}

module.exports = StudentList;