const
    $     = require("jquery"),
    React = require("react"),
    Modal = require("react-modal")
;


class StudentDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const
            props        = this.props,
            isActive     = props.isActive,
            modalTitle   = props.title,
            customStyles = props.modalStyles,
            onCancel     = props.onCancel,
            onExecute    = props.onExecute,
            executeText  = props.executeText,
            student      = props.student || {}
        ;

        return (
            <Modal
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                isOpen={isActive}
                style={customStyles}>
                <div className={"modal-content"} style={{border: "none"}}>
                    <div className={"modal-header"}>
                        <h5 className={"modal-title"}>{modalTitle}</h5>
                        <button
                            onClick={onCancel}
                            type="button"
                            className={"close"}
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className={"modal-body"}>
                        {props.children}
                    </div>
                    <div className={"modal-footer"}>

                        <button
                            onClick={onCancel}
                            type="button"
                            className={"btn btn-secondary"}
                            data-dismiss="modal">
                            Cancel
                        </button>

                        <button
                            onClick={onExecute}
                            type="button"
                            className={"btn btn-primary"}>
                            {executeText}
                        </button>

                    </div>
                </div>
            </Modal>
        );
    }
}

module.exports = StudentDialog;