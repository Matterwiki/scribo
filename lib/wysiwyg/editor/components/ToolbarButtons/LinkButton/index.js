import React from "react";
import isBoolean from "lodash.isboolean";

import { FaLink } from "react-icons/fa";

import ToolbarButton from "../../../../../common/components/ToolbarButton";
import ToolbarPopover from "../../ToolbarPopover";

import ManageLinkPopover from "./ManageLinkPopover";

export default class LinkToolbarButton extends React.Component {
    state = {
        popupVisible: false
    };

    togglePopupVisibility = (override) => {
        this.setState((prevState) => ({
            popupVisible: isBoolean(override) ? override : !prevState.popupVisible
        }));
    };

    handleLinkObtained = (urlHref) => {
        this.togglePopupVisibility();

        const { value, editor } = this.props;

        editor.createOrUpdateLink(urlHref);
    };

    handleRemove = () => {
        this.togglePopupVisibility();

        const { editor } = this.props;
        editor.clearLink();
    };

    render() {
        const { value, onChange, editor, ...toolbarProps } = this.props;

        const { popupVisible } = this.state;
        const linkData = editor.getLinkData();
        const url = linkData ? linkData.href : "";

        return (
            <ToolbarPopover
                visible={popupVisible}
                onClickOutside={() => this.togglePopupVisibility(false)}
                content={
                    <ManageLinkPopover
                        url={url}
                        onLinkObtained={this.handleLinkObtained}
                        onLinkRemoved={this.handleRemove}
                    />
                }>
                <ToolbarButton
                    active={editor.hasLink()}
                    icon={FaLink}
                    onClick={this.togglePopupVisibility}
                    {...toolbarProps}
                />
            </ToolbarPopover>
        );
    }
}
