import React from "react";
import styled from "styled-components";

const StyledContent = styled.span`
    margin: 12px 0 0 0;
`;

// Mark renders

export function BoldMark({ children, attributes }) {
    return <strong {...attributes}>{children}</strong>;
}

export function ItalicsMark({ children, attributes }) {
    return <em {...attributes}>{children}</em>;
}

export { default as CodeMark } from "./CodeMark";

export function UnderlinedMark({ children, attributes }) {
    return <u {...attributes}>{children}</u>;
}

export { default as StrikeThroughMark } from "./StrikeThroughMark";

export { default as LinkInline } from "./LinkInlineNode";

// Node renders

export function HeadingOneNode({ children, attributes }) {
    return <h1 {...attributes}>{children}</h1>;
}

export function HeadingTwoNode({ children, attributes }) {
    return <h2 {...attributes}>{children}</h2>;
}

export function HeadingThreeNode({ children, attributes }) {
    return <h3 {...attributes}>{children}</h3>;
}

export { default as BlockQuoteNode } from "./BlockQuoteNode";

export { default as CodeBlockNode } from "./CodeBlockNode";

export function BulletedListNode({ children, attributes }) {
    return <ul {...attributes}>{children}</ul>;
}

export function NumberedListNode({ children, attributes }) {
    return <ol {...attributes}>{children}</ol>;
}

export function ListItem({ children, attributes }) {
    return (
        // TODO This could benefit from using the css prop
        // https://medium.com/styled-components/announcing-native-support-for-the-css-prop-in-styled-components-245ca5252feb
        <li {...attributes}>
            <StyledContent>{children}</StyledContent>
        </li>
    );
}

export * from "./TableNodes";

export { default as ParagraphNode } from "./ParagraphNode";

export { default as ImageNode } from "./ImageNode";
