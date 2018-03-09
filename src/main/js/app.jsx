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
        top: "40%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            isUpdateActive: false,
            isDeleteActive: false,
            currentStudent: null,
            errorMessage: null,
            successMessage: null
        };

        Utils.bind(this,
            "resetState", "onError",  "clearMessages",
            "showCreate", "doCreate", "cancelCreate",
            "showUpdate", "doUpdate", "cancelUpdate",
            "showDelete", "doDelete", "cancelDelete"
        );
    }

    componentDidMount() {
        const onComplete = (function (students) {
            this.setState({
                students: students
            });
        }).bind(this);

        StudentApi.getAllStudents().done(onComplete);
    }

    resetState(additionalState) {
        const defaultState = {
            isCreateActive: false,
            isUpdateActive: false,
            isDeleteActive: false,
            currentStudent: null
        };
        if (typeof additionalState === "function") {
            this.setState(function(prevState, props) {
                let state = additionalState(prevState, props);
                state = $.extend({}, defaultState, state);
                return state;
            });
        } else if (typeof additionalState === "object") {
            const state = $.extend({}, defaultState, additionalState);
            this.setState(state);
        } else {
            this.setState(defaultState);
        }
    }

    /**
     *
     * @param jqXHR
     * @param textStatus
     * @param error
     */
    onError(jqXHR, textStatus, error) {
        // noinspection JSUnresolvedVariable
        this.resetState({
            errorMessage: jqXHR.responseJSON.message
        });
    }

    clearMessages(e) {
        e.preventDefault();
        this.setState({
            successMessage: null,
            errorMessage: null
        })
    }

    // -----------------------------------------------------------------------------------------------------------------
    // Create UI calls

    /**
     *
     */
    showCreate() {
        this.setState({
            isCreateActive: true,
            currentStudent: null
        });
    }

    doCreate(student) {
        const onCreate = (function (created) {
            this.resetState((prevState, props) => ({
                students: prevState.students.concat(created),
                successMessage: "Student has been created"
            }));
        }).bind(this);

        // @formatter:off
        StudentApi.createStudent(student).
            done(onCreate).
            fail(this.onError)
        ;
        // @formatter:on
    }

    cancelCreate() {
        this.setState({
            isCreateActive: false,
            currentStudent: null
        });
    }

    // -----------------------------------------------------------------------------------------------------------------
    // Update UI calls

    /**
     *
     * @param student
     */
    showUpdate(student) {
        this.setState({
            isUpdateActive: true,
            currentStudent: student
        });
    }

    doUpdate(student) {
        const onUpdate = (function (updated) {
            this.resetState((prevState, props) => ({
                students: Utils.replace(prevState.students, prevState.currentStudent, updated),
                successMessage: "Student has been updated"
            }));
        }).bind(this);

        // @formatter:off
        StudentApi.updateStudent(student).
            done(onUpdate).
            fail(this.onError)
        ;
        // @formatter:on
    }

    cancelUpdate() {
        this.setState({
            isUpdateActive: false,
            currentStudent: null
        });
    }

    // -----------------------------------------------------------------------------------------------------------------
    // Delete UI calls

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
        const
            student  = this.state.currentStudent,
            onDelete = (function () {
                this.resetState((prevState, props) => ({
                    students: prevState.students.filter(toChk => toChk.id !== student.id),
                    successMessage: "Student has been deleted"
                }));
            }).bind(this);

        // @formatter:off
        StudentApi.deleteStudent(student).
            done(onDelete).
            fail(this.onError)
        ;
        // @formatter:on
    }

    cancelDelete() {
        this.setState({
            isDeleteActive: false,
            currentStudent: null
        });
    }

    // -----------------------------------------------------------------------------------------------------------------

    render() {
        return (
            <div className={'row'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={"col-md-12"}>
                            <StudentMessage
                                successMessage={this.state.successMessage}
                                errorMessage={this.state.errorMessage}
                                onClose={this.clearMessages}/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <StudentList
                                students={this.state.students}
                                showCreate={this.showCreate}
                                showUpdate={this.showUpdate}
                                showDelete={this.showDelete}/>
                        </div>
                    </div>

                    <EditDialog
                        label={"Create"}
                        modalStyles={modalStyles}
                        isActive={this.state.isCreateActive}
                        execute={this.doCreate}
                        cancel={this.cancelCreate}/>

                    <EditDialog
                        label={"Update"}
                        modalStyles={modalStyles}
                        isActive={this.state.isUpdateActive}
                        student={this.state.currentStudent}
                        execute={this.doUpdate}
                        cancel={this.cancelUpdate}/>

                    <DeleteDialog
                        modalStyles={modalStyles}
                        isActive={this.state.isDeleteActive}
                        student={this.state.currentStudent}
                        doDelete={this.doDelete}
                        cancelDelete={this.cancelDelete}/>

                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
