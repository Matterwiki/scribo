import React from "react";
import { FaUnlink, FaSave } from "react-icons/fa";
import classnames from "classnames";

import { ToolbarTooltipIcon } from "../../components/index";

export default class ManageLinkPopup extends React.Component {
    state = { value: "", formInvalid: false };

    static getDerivedStateFromProps(props, currentState) {
        // TODO Might not be the best method, rethink
        if (!props.urlHref || currentState.value === props.urlHref) return null;

        return {
            value: props.urlHref
        };
    }

    setUrl = (urlHref = "") => {
        this.setState({ value: urlHref });
    };

    onChange = (e) => {
        this.setUrl(e.target.value);
    };

    reset = () => {
        this.setState({ value: "", formInvalid: false });
    };

    validateUrl = (urlHref) => {
        const isValidUrl = !!urlHref;
        this.setState({ formInvalid: !isValidUrl });
        return isValidUrl;
    };

    saveLink = (e) => {
        e.preventDefault();

        const { value: urlHref } = this.state;

        if (!this.validateUrl(urlHref)) return;

        this.props.onSubmit(urlHref);
        this.reset();
    };

    removeLink = (e) => {
        e.preventDefault();
        this.props.onRemove();
        this.reset();
    };

    render() {
        const showRemove = this.props.urlHref !== "";
        const { formInvalid, value } = this.state;
        return (
            <React.Fragment>
                <div className="align-horizontal manage-link-popup">
                    <span> Enter link:</span>{" "}
                    <input
                        className={classnames({ "validation-border-error": formInvalid })}
                        autoFocus
                        type="text"
                        value={value}
                        onChange={this.onChange}
                    />{" "}
                    <button
                        type="button"
                        className="scribo-toolbar-tooltip-button"
                        onClick={this.saveLink}>
                        <ToolbarTooltipIcon icon={FaSave} />
                    </button>
                    {showRemove && (
                        <button
                            type="button"
                            className="scribo-toolbar-tooltip-button"
                            onClick={this.removeLink}>
                            <ToolbarTooltipIcon icon={FaUnlink} />
                        </button>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
