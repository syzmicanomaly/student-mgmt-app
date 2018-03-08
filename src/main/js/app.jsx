const
    React          = require("react"),
    ReactDOM       = require("react-dom"),
    Modal          = require("react-modal"),

    StudentApi     = require("./student-api"),
    Utils          = require("./utils"),

    StudentList    = require("./student-list.jsx"),
    DeleteDialog   = require("./student-delete-dialog.jsx"),
    EditDialog     = require("./student-edit-dialog.jsx"),
    StudentMessage = require("./student-message.jsx")
;

// noinspection JSUnresolvedFunction
Modal.setAppElement("#react");

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            isEditActive: false,
            isDeleteActive: false,
            currentStudent: null,
            errorMessage: null,
            successMessage: null
        };

        Utils.bind(this,
            "loadStudents", "resetState", "onError", "onSuccess",
            "updateStudent", "deleteStudent", "showEdit", "showDelete",
            "cancelDelete", "doDelete", "cancelUpdate", "doUpdate", "clearMessages"
        );
    }

    componentDidMount() {
        StudentApi.getAllStudents().done(this.loadStudents);
    }

    resetState() {
        this.setState({
            isEditActive: false,
            isDeleteActive: false,
            currentStudent: null
        });
    }

    /**
     *
     * @param jqXHR
     * @param textStatus
     * @param error
     */
    onError(jqXHR, textStatus, error) {
        this.setState({
            errorMessage: error
        });
    }

    /**
     *
     * @param message
     */
    onSuccess(message) {
        this.setState({
            successMessage: message
        });
    }

    /**
     *
     * @param students
     */
    loadStudents(students) {
        this.setState({
            students: students
        });
    }

    /**
     *
     * @param student
     */
    updateStudent(student) {
        const onUpdate = (function () {
            this.onSuccess("Student has been updated");
        }).bind(this);

        // @formatter:off
        StudentApi.updateStudent(student).
            done(function () {
                StudentApi.getAllStudents().done(onUpdate);
            }).
            fail(this.onError).
            always(this.resetState)
        ;
        // @formatter:on

    }

    /**
     *
     * @param student
     */
    deleteStudent(student) {
        const onDelete = (function () {
            this.setState((prevState, props) => ({
                students: prevState.students.filter(toChk => toChk.id !== student.id),
                successMessage: "Student has been deleted"
            }));
        }).bind(this);

        // @formatter:off
        StudentApi.deleteStudent(student).
            done(onDelete).
            fail(this.onError).
            always(this.resetState)
        ;
        // @formatter:on

    }

    /**
     *
     * @param student
     */
    showEdit(student) {
        this.setState({
            isEditActive: true,
            currentStudent: student
        });
    }

    /**
     *
     * @param student
     */
    showDelete(student) {
        this.setState({
            isDeleteActive: true,
            currentStudent: student
        });
    }

    doDelete() {
        this.deleteStudent(this.state.currentStudent);
    }

    cancelDelete() {
        this.setState({
            isDeleteActive: false,
            currentStudent: null
        });
    }

    doUpdate() {
        this.updateStudent(this.state.currentStudent);
    }

    cancelUpdate() {
        this.setState({
            isEditActive: false,
            currentStudent: null
        });
    }

    clearMessages(e) {
        e.preventDefault();
        this.setState({
            successMessage: null,
            errorMessage: null
        })
    }

    render() {
        return (
            <div className={'row'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={"col-md-12"}>
                            <StudentMessage
                                successMessage={this.state.successMessage}
                                errorMessage={this.state.errorMessage}
                                onClose={this.clearMessages}
                            />
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <StudentList
                                students={this.state.students}
                                showEdit={this.showEdit}
                                showDelete={this.showDelete}/>
                        </div>
                    </div>

                    <DeleteDialog
                        modalStyles={modalStyles}
                        isActive={this.state.isDeleteActive}
                        student={this.state.currentStudent}
                        doDelete={this.doDelete}
                        cancelDelete={this.cancelDelete}/>

                    <EditDialog
                        modalStyles={modalStyles}
                        isActive={this.state.isEditActive}
                        student={this.state.currentStudent}
                        doUpdate={this.doUpdate}
                        cancelUpdate={this.cancelUpdate}/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
