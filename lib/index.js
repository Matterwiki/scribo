import React from "react";
import { Value } from "slate";

import ClearBlockFormattingPlugin from "./plugins/clearBlockFormatting";

import { BoldPlugins } from "./plugins/bold";
import { ItalicPlugins } from "./plugins/italic";
import { CodePlugins } from "./plugins/code";
import { StrikeThroughPlugins } from "./plugins/strikeThrough";
import { UnderlinedPlugins } from "./plugins/underlined";
import { LinkPlugins } from "./plugins/link/index";
import { EmojiPlugins } from "./plugins/emoji/index";
import { HeadingPlugins } from "./plugins/heading";
import { BlockQuotePlugins } from "./plugins/blockQuote";
import { CodeBlockPlugins } from "./plugins/codeBlock";
import PlaceholderPlugin from "./plugins/placeholder";
import ParagraphPlugin from "./plugins/paragraph";

import EditorToolbar from "./components/EditorToolbar";
import EditorContent from "./components/EditorContent";
import Editor from "./components/Editor";

import { EMPTY_EDITOR_VALUE } from "./constants";

const plugins = [
    // utility plugins
    ClearBlockFormattingPlugin(),
    PlaceholderPlugin(),

    // feature plugins
    ...BoldPlugins(),
    ...ItalicPlugins(),
    ...CodePlugins(),
    ...StrikeThroughPlugins(),
    ...UnderlinedPlugins(),
    ...LinkPlugins(),
    ...EmojiPlugins(),
    ...HeadingPlugins(),
    ...BlockQuotePlugins(),
    ...CodeBlockPlugins(),
    ...ParagraphPlugin()
];

export default class WikiEditor extends React.Component {
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
                <EditorToolbar value={value} onChange={this.onChange} />
                <EditorContent>
                    <Editor
                        value={value}
                        customPlaceholder={placeholder}
                        plugins={plugins}
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        renderMark={this.renderMark}
                        renderNode={this.renderNode}
                    />
                </EditorContent>
            </React.Fragment>
        );
    }
}
