const
    $             = require("jquery"),
    React         = require("react"),
    StudentDialog = require("./student-dialog.jsx")
;

class DeleteDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const
            props        = this.props,
            isActive     = props.isActive,
            customStyles = props.modalStyles,
            onCancel     = props.cancelDelete,
            onExecute    = props.doDelete,
            student      = props.student || {},
            firstName    = student.firstName,
            lastName     = student.lastName
        ;

        return (
            <StudentDialog
                title={"Delete Student"}
                modalStyles={customStyles}
                isActive={isActive}
                onCancel={onCancel}
                onExecute={onExecute}
                executeText={"Delete"}>

                <p>
                    Are you sure you want to delete {firstName} {lastName}?
                </p>

            </StudentDialog>
        );
    }
}

module.exports = DeleteDialog;