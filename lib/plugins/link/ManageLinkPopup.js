import React from "react";
import { FaUnlink, FaSave } from "react-icons/fa";

import { ToolbarTooltipIcon } from "../../components/index";

export default class ManageLinkPopup extends React.Component {
    state = { value: "" };

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
        this.setUrl();
    };

    saveLink = (e) => {
        e.preventDefault();

        const { value: urlHref } = this.state;

        if (!urlHref) return;

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

        return (
            <div className="align-horizontal manage-link-popup">
                <span> Enter link:</span>{" "}
                <input autoFocus type="text" value={this.state.value} onChange={this.onChange} />{" "}
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
        );
    }
}
