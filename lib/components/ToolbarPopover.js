import React from "react";
import Popover from "react-tiny-popover";

export default class ToolbarPopover extends React.Component {
    render() {
        const { children, content, visible, onClickOutside } = this.props;
        return (
            <Popover
                isOpen={visible}
                position="bottom"
                padding={10}
                onClickOutside={onClickOutside}
                containerClassName="editor-popover"
                content={content}>
                {children}
            </Popover>
        );
    }
}
