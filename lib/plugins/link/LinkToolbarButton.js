import React from "react";

import { FaLink } from "react-icons/fa";
import { getLinkData, hasLink, handleLinkCreateOrUpdate, handleLinkRemove } from "./utils";

import ToolbarButton from "../../components/ToolbarButton";
import ToolbarPopover from "../../components/ToolbarPopover";

import ManageLinkPopover from "./ManageLinkPopover";

export default class LinkToolbarButton extends React.Component {
    state = {
        popupVisible: false
    };

    togglePopupVisibility = (override) => {
        this.setState((prevState) => ({
            popupVisible: typeof override === "boolean" ? override : !prevState.popupVisible
        }));
    };

    handleLinkObtained = (urlHref) => {
        this.togglePopupVisibility();

        const { value, onChange } = this.props;

        onChange(handleLinkCreateOrUpdate(value, urlHref));
    };

    handleRemove = () => {
        this.togglePopupVisibility();

        const { value, onChange } = this.props;

        onChange(handleLinkRemove(value));
    };

    render() {
        const { value, onChange, ...toolbarProps } = this.props;

        const { popupVisible } = this.state;
        const linkData = getLinkData(value);
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
                    active={hasLink(value)}
                    icon={FaLink}
                    onClick={this.togglePopupVisibility}
                    {...toolbarProps}
                />
            </ToolbarPopover>
        );
    }
}
