import React from "react";

import { BoldToolbarButton } from "../plugins/bold";
import { ItalicToolbarButton } from "../plugins/italic";
import { CodeToolbarButton } from "../plugins/code";
import { StrikeThroughToolbarButton } from "../plugins/strikeThrough";
import { UnderlinedToolbarButton } from "../plugins/underlined";
import { LinkToolbarButton } from "../plugins/link/index";
import { EmojiToolbarButton } from "../plugins/emoji/index";
import { HeadingOneButton, HeadingTwoButton, HeadingThreeButton } from "../plugins/heading";
import { BlockQuoteButton } from "../plugins/blockQuote";

export default class ScriboToolbar extends React.Component {
    render() {
        const toolbarProps = this.props;

        return (
            <div className="row scribo-editor-toolbar">
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
                <EmojiToolbarButton {...toolbarProps} />
            </div>
        );
    }
}
