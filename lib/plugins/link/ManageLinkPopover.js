import React from "react";
import { FaUnlink, FaExternalLinkAlt } from "react-icons/fa";
import cx from "classnames";
import { isKeyHotkey } from "is-hotkey";

import ToolbarTooltipIcon from "../../components/ToolbarTooltipIcon";

export default class ManageLinkPopup extends React.Component {
    state = { value: this.props.url, formInvalid: false };

    onChange = (e) => {
        this.setState({ value: e.target.value });
    };

    reset = () => {
        this.setState({ value: "", formInvalid: false });
    };

    validateUrl = (url) => {
        const isValidUrl = !!url;
        this.setState({ formInvalid: !isValidUrl });
        return isValidUrl;
    };

    saveLink = (e) => {
        if (isKeyHotkey("enter", e)) {
            const { value: url } = this.state;

            if (!this.validateUrl(url)) return;

            this.props.onLinkObtained(url);
            this.reset();
        }
    };

    openLink = (e) => {
        e.preventDefault();

        const { value } = this.state;
        window.open(value.indexOf("http") === -1 ? `http://${value}` : value, "_blank");
    };

    removeLink = (e) => {
        e.preventDefault();
        this.props.onLinkRemoved();
        this.reset();
    };

    render() {
        const urlExists = !!this.props.url;
        const { formInvalid, value } = this.state;

        return (
            <div className="manage-link-popover">
                <input
                    className={cx({
                        "validation-border-error": formInvalid,
                        "with-border-right": urlExists
                    })}
                    autoFocus
                    type="text"
                    placeholder="Paste link"
                    value={value}
                    onChange={this.onChange}
                    onKeyPress={this.saveLink}
                />{" "}
                {urlExists && (
                    <button
                        type="button"
                        className="scribo-toolbar-tooltip-button"
                        onClick={this.openLink}>
                        <ToolbarTooltipIcon icon={FaExternalLinkAlt} />
                    </button>
                )}
                {urlExists && (
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
