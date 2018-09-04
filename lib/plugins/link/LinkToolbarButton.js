import React from "react";
import classnames from "classnames";

import LinkIcon from "quill-icons/lib/icons/link";
import { hasLink, getLink, wrapLink, unwrapLink } from "./utils";

import { ToolbarButton, ToolbarIcon, ToolbarPopover } from "../../components/index";
import ManageLinkPopup from "./ManageLinkPopup";

export default class LinkToolbarButton extends React.Component {
    state = {
        popupVisible: false
    };

    togglePopupVisibility = (override) => {
        this.setState((prevState) => {
            return {
                popupVisible: typeof override === "boolean" ? override : !prevState.popupVisible
            };
        });
    };

    handleLinkObtained = (urlHref) => {
        this.togglePopupVisibility();

        const { value, onChange } = this.props;
        const change = value.change();

        if (value.isExpanded) {
            change.call(wrapLink, urlHref);
        } else {
            change
                .insertText(urlHref)
                .extend(0 - urlHref.length)
                .call(wrapLink, urlHref);
        }

        onChange(change);
    };

    handleRemove = () => {
        this.togglePopupVisibility();

        const { value, onChange } = this.props;
        const change = value.change();

        change.call(unwrapLink);

        onChange(change);
    };

    render() {
        const { value, onChange, className, ...toolbarProps } = this.props;

        const { popupVisible } = this.state;
        const urlHref = getLink(value) || "";

        const classNamesList = classnames({ active: hasLink(value) }, className);

        return (
            <React.Fragment>
                <ToolbarButton
                    id="link-button"
                    className={classNamesList}
                    onClick={this.togglePopupVisibility}
                    {...toolbarProps}>
                    <ToolbarIcon icon={LinkIcon} />
                </ToolbarButton>
                <ToolbarPopover visible={popupVisible} parent="#link-button">
                    <ManageLinkPopup
                        urlHref={urlHref}
                        onSubmit={this.handleLinkObtained}
                        onRemove={this.handleRemove}
                    />
                </ToolbarPopover>
            </React.Fragment>
        );
    }
}
