const React        = require("react");

/**
 * React.js UI component for triggering Create Student dialog.
 *
 * @author Ryan Hardy
 */
class StudentAddRow extends React.Component {
    /**
     * @param {{}} props
     * @param {{}} props.addStudent
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
            isActive   = this.state.isActive,
            cssClass   = "row student-detail text-center" + (isActive ? " active" : ""),
            addStudent = this.props.addStudent
        ;
        return (
            <div className={cssClass} onClick={addStudent} onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseOut}>
                <div className={'student-cell student-add-cell col-md-12'}>
                    {isActive && "Add New Student"}
                </div>
            </div>
        )
    }
}

module.exports = StudentAddRow;