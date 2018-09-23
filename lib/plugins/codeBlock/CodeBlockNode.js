import React from "react";
import styled from "styled-components";

import CodeNode from "../code/CodeMark";

const StyledPre = styled.pre`
    display: flex;
`;

const StyledCode = styled(CodeNode)`
    flex-grow: 1;
    padding: 2em;
`;

export default function CodeBlockNode({ children, attributes }) {
    return (
        <StyledPre {...attributes}>
            <StyledCode>{children}</StyledCode>
        </StyledPre>
    );
}
