import React from "react";
import styled from "styled-components";

import ToolbarButton from "../../../../common/components/ToolbarButton";
import { NODE_TYPES } from "../../../../common/constants";

const StyledToolbarButton = styled(ToolbarButton)`
    font-weight: bolder;
    font-size: large;
    margin-right: 0.4em;
`;

export function HeadingOneButton({ value, editor, ...props }) {
    return (
        <StyledToolbarButton
            active={editor.hasBlock(NODE_TYPES.HEADING_ONE)}
            onClick={(e) => editor.addOrRemoveBlock(NODE_TYPES.HEADING_ONE)}
            {...props}>
            h1
        </StyledToolbarButton>
    );
}

export function HeadingTwoButton({ value, editor, ...props }) {
    return (
        <StyledToolbarButton
            active={editor.hasBlock(NODE_TYPES.HEADING_TWO)}
            onClick={(e) => editor.addOrRemoveBlock(NODE_TYPES.HEADING_TWO)}
            {...props}>
            h2
        </StyledToolbarButton>
    );
}

export function HeadingThreeButton({ value, editor, ...props }) {
    return (
        <StyledToolbarButton
            active={editor.hasBlock(NODE_TYPES.HEADING_THREE)}
            onClick={(e) => editor.addOrRemoveBlock(NODE_TYPES.HEADING_THREE)}
            {...props}>
            h3
        </StyledToolbarButton>
    );
}
