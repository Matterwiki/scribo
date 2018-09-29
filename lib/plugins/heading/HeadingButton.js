import React from "react";
import styled from "styled-components";

import ToolbarButton from "../../components/ToolbarButton";
import { hasBlock, addOrRemoveBlock } from "../../changeUtils";
import { NODE_TYPES } from "../../constants";

const StyledToolbarButton = styled(ToolbarButton)`
    font-weight: bolder;
    font-size: xx-large;
    margin-right: 0.4em;
`;

export function HeadingOneButton({ value, onChange, ...props }) {
    return (
        <StyledToolbarButton
            active={hasBlock(value, NODE_TYPES.HEADING_ONE)}
            onClick={(e) => onChange(addOrRemoveBlock(value, NODE_TYPES.HEADING_ONE))}
            {...props}>
            h1
        </StyledToolbarButton>
    );
}

export function HeadingTwoButton({ value, onChange, ...props }) {
    return (
        <StyledToolbarButton
            active={hasBlock(value, NODE_TYPES.HEADING_TWO)}
            onClick={(e) => onChange(addOrRemoveBlock(value, NODE_TYPES.HEADING_TWO))}
            {...props}>
            h2
        </StyledToolbarButton>
    );
}

export function HeadingThreeButton({ value, onChange, ...props }) {
    return (
        <StyledToolbarButton
            active={hasBlock(value, NODE_TYPES.HEADING_THREE)}
            onClick={(e) => onChange(addOrRemoveBlock(value, NODE_TYPES.HEADING_THREE))}
            {...props}>
            h3
        </StyledToolbarButton>
    );
}
