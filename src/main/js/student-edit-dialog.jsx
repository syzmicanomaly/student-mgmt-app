const
    $             = require("jquery"),
    React         = require("react"),
    Utils         = require("./utils"),
    StudentDialog = require("./student-dialog.jsx")
;

class EditDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // noinspection JSUnresolvedVariable
        const
            props        = this.props,
            label        = props.label,
            isActive     = props.isActive,
            customStyles = props.modalStyles,
            onCancel     = props.cancel,
            student      = props.student || {},
            birthDate    = Utils.formatDate(student.birthDate, "yyyy-mm-dd"),
            doExecute    = (function () {
                const
                    props          = this.props,
                    currentStudent = props.student || {id: null},
                    id             = currentStudent.id,
                    student        = {
                        id: id,
                        firstName: this._firstName.value,
                        lastName: this._lastName.value,
                        email: this._email.value,
                        birthDate: Utils.formatDate(this._birthDate.value + " 00:00:00", "mm-dd-yyyy HH:MM:ss")
                    }
                ;
                this.props.execute(student);
            }).bind(this)
        ;

        return (
            <StudentDialog
                title={label + " Student"}
                modalStyles={customStyles}
                isActive={isActive}
                onCancel={onCancel}
                onExecute={doExecute}
                executeText={label}>

                <div className={"form-group"}>
                    <label htmlFor={"firstName"}>First Name</label>
                    <input type="text"
                           id="firstName"
                           className={"form-control"}
                           placeholder="Enter First Name"
                           ref={input => this._firstName = input}
                           defaultValue={student.firstName} required/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"lastName"}>Last Name</label>
                    <input type="text"
                           id="lastName"
                           className={"form-control"}
                           placeholder="Enter Last Name"
                           ref={input => this._lastName = input}
                           defaultValue={student.lastName} required/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"email"}>Email address</label>
                    <input type="email"
                           id="email"
                           className={"form-control"}
                           placeholder="Enter Email"
                           ref={input => this._email = input}
                           defaultValue={student.email} required/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"birthDate"}>Birthdate</label>
                    <input type="date"
                           id="birthDate"
                           className={"form-control"}
                           placeholder="Enter Birth Date"
                           ref={input => this._birthDate = input}
                           defaultValue={birthDate} required/>
                </div>

            </StudentDialog>
        );
    }
}

module.exports = EditDialog;