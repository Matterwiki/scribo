import React from "react";
import styled from "styled-components";

const StyledIconButton = styled.button`
    background: transparent;
    border: none;
    box-sizing: content-box;
    color: #393e41;
    cursor: pointer;
    font-size: 15px;
    margin: 0.2em;
    max-width: 20px;
    outline: 0;
`;

export function ToolbarPopoverIconButton({ icon: Icon, ...props }) {
    return (
        <StyledIconButton {...props}>
            <Icon width={20} height={20} {...props} />
        </StyledIconButton>
    );
}

// TODO Add ToolbarPopoverButton component
