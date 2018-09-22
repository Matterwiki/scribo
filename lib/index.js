import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

import SoftBreak from "slate-soft-break";
import { BoldPlugin } from "./plugins/bold";
import { ItalicPlugin } from "./plugins/italic";
import { CodePlugin } from "./plugins/code";
import { StrikeThroughPlugin } from "./plugins/strikeThrough";
import { UnderlinedPlugin } from "./plugins/underlined";
import { LinkPlugin } from "./plugins/link/index";
import { EmojiPlugin } from "./plugins/emoji/index";
import { HeadingPlugin } from "./plugins/heading";
import { BlockQuotePlugin } from "./plugins/blockQuote";
import PlaceholderPlugin from "./plugins/placeholder";
import ParagraphPlugin from "./plugins/paragraph";
import ClearBlockFormattingPlugin from "./plugins/clearBlockFormatting";

import ScriboToolbar from "./components/ScriboToolbar";

import { EMPTY_EDITOR_VALUE, DEFAULT_NODE } from "./constants";

const plugins = [
    // utility plugins
    SoftBreak({ shift: true }),
    ClearBlockFormattingPlugin(),

    // feature plugins
    BoldPlugin(),
    ItalicPlugin(),
    CodePlugin(),
    StrikeThroughPlugin(),
    UnderlinedPlugin(),
    LinkPlugin(),
    EmojiPlugin(),
    HeadingPlugin(),
    BlockQuotePlugin(),
    PlaceholderPlugin(),
    ParagraphPlugin()
];

export default class ScriboEditor extends React.Component {
    state = {
        value: Value.fromJSON(EMPTY_EDITOR_VALUE)
    };

    onChange = ({ value }) => {
        this.setState({ value });
    };

    render() {
        const { placeholder } = this.props;
        const { value } = this.state;

        return (
            <React.Fragment>
                <ScriboToolbar value={value} onChange={this.onChange} />
                <div className="scribo-editor-content">
                    <Editor
                        value={value}
                        customPlaceholder={placeholder}
                        plugins={plugins}
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        renderMark={this.renderMark}
                        renderNode={this.renderNode}
                    />
                </div>
            </React.Fragment>
        );
    }
}
