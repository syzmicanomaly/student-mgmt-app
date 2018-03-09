const
    React          = require("react"),
    StudentDetails = require("./student-details.jsx"),
    StudentAddRow  = require("./student-add-row.jsx")
;

class StudentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const
            students   = this.props.students,
            showCreate = this.props.showCreate,
            showUpdate = this.props.showUpdate,
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
                        editStudent={() => {
                            showUpdate(student)
                        }}
                        deleteStudent={() => {
                            showDelete(student)
                        }}/>
                )}

                <StudentAddRow addStudent={showCreate}/>
            </div>
        )
    }
}

module.exports = StudentList;