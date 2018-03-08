const
    React        = require("react"),
    EditControls = require("./student-edit-controls.jsx"),
    Utils        = require("./utils")

;

class StudentDetails extends React.Component {
    /**
     * @param {{}} props
     * @param {{}} props.student
     * @param {string} props.student.firstName
     * @param {string} props.student.lastName
     * @param {string} props.student.email
     * @param {number} props.student.birthDate
     */
    constructor(props) {
        super(props);
        this.state       = {isActive: false};
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut  = this.onMouseOut.bind(this);
    }

    onMouseOver() {
        this.setState({isActive: true});
    }

    onMouseOut() {
        this.setState({isActive: false});
    }

    render() {
        const
            student       = this.props.student,
            isActive      = this.state.isActive,
            cssClass      = "row student-detail" + (isActive ? " active" : ""),
            editStudent   = this.props.editStudent,
            deleteStudent = this.props.deleteStudent
        ;
        return (
            <div className={cssClass} onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseOut}>
                <div className={'student-cell col-md-2'}>{student.firstName}</div>
                <div className={'student-cell col-md-2'}>{student.lastName}</div>
                <div className={'student-cell col-md-3'}>{student.email}</div>
                <div className={'student-cell col-md-3'}>{Utils.formatDate(student.birthDate, "m/d/yyyy")}</div>
                <div className={'student-cell col-md-2'}>
                    <EditControls isActive={isActive} editStudent={editStudent} deleteStudent={deleteStudent}/>
                </div>
            </div>
        )
    }
}

module.exports = StudentDetails;