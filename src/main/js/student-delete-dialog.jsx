const
    $             = require("jquery"),
    React         = require("react"),
    StudentDialog = require("./student-dialog.jsx")
;

/**
 * React.js UI component for Delete Student dialog.
 *
 * @author Ryan Hardy
 */
class DeleteDialog extends React.Component {
    /**
     * @param props
     * @param props.isActive
     * @param props.modalStyles
     * @param props.student
     * @param props.student.firstName
     * @param props.student.lastName
     */
    constructor(props) {
        super(props);
    }

    render() {
        const
            props        = this.props,
            isActive     = props.isActive,
            customStyles = $.extend(true, {}, props.modalStyles),
            onCancel     = props.cancelDelete,
            onExecute    = props.doDelete,
            student      = props.student || {},
            firstName    = student.firstName,
            lastName     = student.lastName
        ;

        // ensure dialog renders higher up in screen
        customStyles.content.top = "30%";

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