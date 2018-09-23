import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
    text-decoration: line-through;
`;

export default function StrikeThroughMark({ children, attributes }) {
    return <StyledSpan {...attributes}>{children}</StyledSpan>;
}
