const
    $     = require("jquery"),
    React = require("react")
;

/**
 * React.js UI component for rendering success/error messages.
 *
 * @param props
 * @return {*}
 * @constructor
 * @author Ryan Hardy
 */
function StudentMessage(props) {
    if (!props.successMessage && !props.errorMessage) {
        return null;
    }
    const
        className = "alert " + (props.successMessage ? "alert-success" : "alert-danger"),
        message = props.successMessage || props.errorMessage,
        onClose = function(e) {
            e.preventDefault();
            props.onClose();
        }
    ;
    return (
        <div className={className} role="alert">
            {message}
            <button type="button" className={"close"} aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}

module.exports = StudentMessage;
