const
    $             = require("jquery"),
    React         = require("react"),
    Utils         = require("./utils"),
    StudentDialog = require("./student-dialog.jsx")
;

class EditDialog extends React.Component {
    constructor(props) {
        super(props);

        Utils.bind(this, "handleChange", "handleSubmit");
    }

    handleChange(e) {

    }

    handleSubmit(e) {
        e.preventDefault();

    }

    render() {
        const
            props        = this.props,
            isActive     = props.isActive,
            customStyles = props.modalStyles,
            onCancel     = props.cancelUpdate,
            onExecute    = props.doUpdate,
            student      = props.student || {},
            birthDate    = Utils.formatDate(student.birthDate, "yyyy-mm-dd")
        ;

        return (
            <StudentDialog
                title={"Update Student"}
                modalStyles={customStyles}
                isActive={isActive}
                onCancel={onCancel}
                onExecute={onExecute}
                executeText={"Update"}>

                <form onSubmit={this.onSubmit}>
                    <div className={"form-group"}>
                        <label htmlFor={"firstName"}>First Name</label>
                        <input type="text" className={"form-control"} id="firstName" placeholder="Enter First Name"
                               value={student.firstName} />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"lastName"}>Last Name</label>
                        <input type="text" className={"form-control"} id="lastName" placeholder="Enter Last Name"
                               value={student.lastName} />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"email"}>Email address</label>
                        <input type="email" className={"form-control"} id="email" placeholder="Enter Email"
                               value={student.email} />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"birthDate"}>Birthdate</label>
                        <input type="date" className={"form-control"} id="birthDate" placeholder="Enter Birth Date"
                               value={birthDate} />
                    </div>
                </form>

            </StudentDialog>
        );
    }
}

module.exports = EditDialog;