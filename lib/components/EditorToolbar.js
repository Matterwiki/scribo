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

const StyledEditorToolbar = styled.div`
    box-sizing: content-box;
    margin: 0;
    margin-bottom: 1rem;
    padding: 10px;
    border-bottom: solid 1px #f4f4f4;
`;

export default class EditorToolbar extends React.Component {
    render() {
        const toolbarProps = this.props;

        return (
            <StyledEditorToolbar>
                <BoldToolbarButton {...toolbarProps} />
                <ItalicToolbarButton {...toolbarProps} />
                <CodeToolbarButton {...toolbarProps} />
                <StrikeThroughToolbarButton {...toolbarProps} />
                <UnderlinedToolbarButton {...toolbarProps} />
                <LinkToolbarButton {...toolbarProps} />
                <HeadingOneButton {...toolbarProps} />
                <HeadingTwoButton {...toolbarProps} />
                <HeadingThreeButton {...toolbarProps} />
                <BlockQuoteButton {...toolbarProps} />
                <CodeBlockButton {...toolbarProps} />
                <NumberedListButton {...toolbarProps} />
                <BullettedListButton {...toolbarProps} />
                <EmojiToolbarButton {...toolbarProps} />
            </StyledEditorToolbar>
        );
    }
}
