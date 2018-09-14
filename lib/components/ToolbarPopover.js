import React from "react";
import Popover from "react-awesome-popover";

import "react-awesome-popover/dest/react-awesome-popover.css";

export default class ToolbarPopover extends React.Component {
    render() {
        const { children, parent, visible, container } = this.props;
        return (
            <Popover placement="bottom" action="click" contentClass="rap-popover-content">
                {children}
            </Popover>
        );
    }
}
