const
    React        = require("react")
;

/**
 * React.js UI component that renders buttons for editing/deleting a student.
 *
 * @param props
 * @param props.isActive
 * @param props.editStudent
 * @param props.deleteStudent
 * @return {*}
 * @constructor
 * @author Ryan Hardy
 */
function EditControls(props) {
    return (
        <div className={'student-edit-controls'} style={props.isActive ? { visibility: "visible" } : { visibility: "hidden" }}>
            <button className={'btn btn-secondary btn-sm edit-btn'} onClick={props.editStudent}>Edit</button>
            <button className={'btn btn-danger btn-sm delete-btn'} onClick={props.deleteStudent}>Delete</button>
        </div>
    );
}

module.exports = EditControls;