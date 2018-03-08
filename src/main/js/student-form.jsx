const
    React = require("react")
;

class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <input className="form-control"/>
            </div>
        )
    }
}

module.exports = StudentForm;