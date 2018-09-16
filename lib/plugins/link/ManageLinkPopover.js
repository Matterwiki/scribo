import React from "react";
import { FaUnlink } from "react-icons/fa";
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

    removeLink = (e) => {
        e.preventDefault();
        this.props.onLinkRemoved();
        this.reset();
    };

    render() {
        const showRemove = !!this.props.url;
        const { formInvalid, value } = this.state;

        return (
            <div className="manage-link-popover">
                <input
                    className={cx({
                        "validation-border-error": formInvalid,
                        "with-border-right": showRemove
                    })}
                    autoFocus
                    type="text"
                    placeholder="Paste link"
                    value={value}
                    onChange={this.onChange}
                    onKeyPress={this.saveLink}
                />{" "}
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
