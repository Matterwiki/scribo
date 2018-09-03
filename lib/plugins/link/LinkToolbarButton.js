import React from "react";
import classnames from "classnames";
import ToolTip from "react-portal-tooltip";

import LinkIcon from "quill-icons/lib/icons/link";
import { hasLink, getLink, wrapLink, unwrapLink } from "./utils";

import { ToolbarButton, ToolbarIcon } from "../../components/index";
import ManageLinkPopup from "./ManageLinkPopup";

export default class LinkToolbarButton extends React.Component {
    state = {
        popupVisible: false
    };

    toggleLinkVisibility = () => {
        this.setState((prevState) => ({ popupVisible: !prevState.popupVisible }));
    };

    handleLinkObtained = (urlHref) => {
        this.toggleLinkVisibility();

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
        this.toggleLinkVisibility();

        const { value, onChange } = this.props;
        const change = value.change();

        change.call(unwrapLink);

        onChange(change);
    };

    render() {
        const {
            value,
            onChange,
            toggleLinkPopup,
            linkText,
            linkHref,
            className,
            ...toolbarProps
        } = this.props;

        const { popupVisible } = this.state;
        const urlHref = getLink(value) || "";

        const classNamesList = classnames({ active: hasLink(value) }, className);

        return (
            <React.Fragment>
                <ToolbarButton
                    id="link-button"
                    className={classNamesList}
                    onClick={this.toggleLinkVisibility}
                    {...toolbarProps}>
                    <ToolbarIcon icon={LinkIcon} />
                </ToolbarButton>
                <ToolTip
                    active={popupVisible}
                    useHover={false}
                    position="bottom"
                    arrow="center"
                    parent="#link-button">
                    <ManageLinkPopup
                        urlHref={urlHref}
                        onSubmit={this.handleLinkObtained}
                        onRemove={this.handleRemove}
                    />
                </ToolTip>
            </React.Fragment>
        );
    }
}
