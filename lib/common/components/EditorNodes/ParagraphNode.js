import React from "react";
import styled from "styled-components";

const StyledParagraph = styled.p`
    margin: 12px 0 0 0;
`;

export default function ParagraphNode({ children, attributes }) {
    return <StyledParagraph {...attributes}>{children}</StyledParagraph>;
}
