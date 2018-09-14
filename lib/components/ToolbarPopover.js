import React from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import PropTypes from "prop-types";

export default class ToolbarPopover extends React.Component {
    render() {
        const { children, content, visible, onClickOutside } = this.props;
        return (
            <Popover
                isOpen={visible}
                position="bottom"
                padding={10}
                onClickOutside={onClickOutside}
                containerClassName="popover-content"
                content={content}>
                {children}
            </Popover>
        );
    }
}
