import React from "react";
import classnames from "classnames";

import LinkIcon from "quill-icons/lib/icons/link";
import { getLinkData, hasLink, handleLinkCreateOrUpdate, handleLinkRemove } from "./utils";

import ToolbarButton from "../../components/ToolbarButton";
import ToolbarIcon from "../../components/ToolbarIcon";
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
        const { value, onChange, className, ...toolbarProps } = this.props;

        const { popupVisible } = this.state;
        const linkData = getLinkData(value);
        const url = linkData ? linkData.href : "";

        const classNamesList = classnames({ active: hasLink(value) }, className);

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
                    className={classNamesList}
                    onClick={this.togglePopupVisibility}
                    {...toolbarProps}>
                    <ToolbarIcon icon={LinkIcon} />
                </ToolbarButton>
            </ToolbarPopover>
        );
    }
}
