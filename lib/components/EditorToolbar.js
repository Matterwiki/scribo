import React from "react";
import styled from "styled-components";

import { BoldToolbarButton } from "../plugins/bold";
import { ItalicToolbarButton } from "../plugins/italic";
import { CodeToolbarButton } from "../plugins/code";
import { StrikeThroughToolbarButton } from "../plugins/strikeThrough";
import { UnderlinedToolbarButton } from "../plugins/underlined";
import { LinkToolbarButton } from "../plugins/link";
import { EmojiToolbarButton } from "../plugins/emoji";
import { HeadingOneButton, HeadingTwoButton, HeadingThreeButton } from "../plugins/heading";
import { BlockQuoteButton } from "../plugins/blockQuote";
import { CodeBlockButton } from "../plugins/codeBlock";
import { NumberedListButton, BullettedListButton } from "../plugins/list";
import { ImageBlockButton } from "../plugins/image";

const StyledEditorToolbar = styled.div`
    box-sizing: content-box;
    margin: 0;
    margin-bottom: 1rem;
    padding: 10px;
    border-bottom: solid 1px #f4f4f4;
`;

export default class EditorToolbar extends React.Component {
    render() {
        const { editorRef, ...restOfTheProps } = this.props;
        const props = Object.assign({ editorRef: editorRef.current }, restOfTheProps);

        // TODO There is probably a better way to do this!
        return (
            <StyledEditorToolbar>
                <BoldToolbarButton {...props} />
                <ItalicToolbarButton {...props} />
                <CodeToolbarButton {...props} />
                <StrikeThroughToolbarButton {...props} />
                <UnderlinedToolbarButton {...props} />
                <LinkToolbarButton {...props} />
                <HeadingOneButton {...props} />
                <HeadingTwoButton {...props} />
                <HeadingThreeButton {...props} />
                <ImageBlockButton {...props} />
                <BlockQuoteButton {...props} />
                <CodeBlockButton {...props} />
                <NumberedListButton {...props} />
                <BullettedListButton {...props} />
                <EmojiToolbarButton {...props} />
            </StyledEditorToolbar>
        );
    }
}
