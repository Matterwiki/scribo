import React from "react";
import styled from "styled-components";

const StyledToolbarButton = styled.button`
    background: transparent;
    border: none;
    box-sizing: content-box;
    color: ${(props) => (props.active ? props.activeColor : props.defaultColor)};
    cursor: pointer;
    font-size: 24px;
    margin: 0.2em;
    max-width: 20px;

    &:focus {
        outline: 0;
    }
`;

function ToolbarButton({ children, className, icon: Icon, ...props }) {
    return (
        <StyledToolbarButton className={className} {...props}>
            {Icon && <Icon size={15} />}
            {children}
        </StyledToolbarButton>
    );
}

ToolbarButton.defaultProps = {
    activeColor: "#ff0066",
    defaultColor: "#393e41",
    active: false,
    icon: null,
    children: null
};

export default ToolbarButton;
