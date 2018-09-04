import React from "react";
import ToolTip from "react-portal-tooltip";
import classnames from "classnames";

export const MarkComponents = {
    Bold({ children, attributes }) {
        return <strong {...attributes}>{children}</strong>;
    },
    Code({ children, attributes }) {
        return <code {...attributes}>{children}</code>;
    },
    Italics({ children, attributes }) {
        return <em {...attributes}>{children}</em>;
    },
    Underlined({ children, attributes }) {
        return <u {...attributes}>{children}</u>;
    },
    StrikeThrough({ children, attributes }) {
        return (
            <span className="strikethrough-mark" {...attributes}>
                {children}
            </span>
        );
    }
};

export const ToolbarButton = ({ children, className, ...props }) => {
    return (
        <button type="button" className={classnames("scribo-toolbar-button", className)} {...props}>
            {children}
        </button>
    );
};

export const ToolbarPopover = ({ children, parent, visible }) => {
    const style = {
        style: {
            transition: "none 0s linear 0s"
        },
        arrowStyle: {
            transition: "none"
        }
    };

    return (
        <ToolTip
            active={visible}
            useHover={false}
            position="bottom"
            arrow="center"
            parent={parent}
            style={style}>
            {children}
        </ToolTip>
    );
};

export const ToolbarIcon = ({ icon: Icon, ...props }) => {
    return <Icon width={30} height={30} {...props} />;
};

export const ToolbarTooltipIcon = ({ icon: Icon, ...props }) => {
    return <Icon width={20} height={20} {...props} />;
};
