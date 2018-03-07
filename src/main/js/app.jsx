const
    React = require('react'),
    ReactDOM = require('react-dom')
;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div>Hello World! </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);
