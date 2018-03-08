const
    React        = require("react")
;

/**
 *
 * @param props
 * @param props.isActive
 * @param props.editStudent
 * @param props.deleteStudent
 * @return {*}
 * @constructor
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