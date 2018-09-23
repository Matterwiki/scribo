import React from "react";
import styled from "styled-components";

// float:left To prevent cursor jumping, see: https://github.com/ianstormtaylor/slate/issues/1436
const StyledSpan = styled.span`
    float: left;
    pointer-events: none;
    display: inline-block;
    width: 0px;
    max-width: 100%;
    white-space: nowrap;
    opacity: 0.333;
`;

export default function PlaceholderNode({ children, ...props }) {
    return (
        <StyledSpan {...props} contentEditable={false}>
            {children}
        </StyledSpan>
    );
}
