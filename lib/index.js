import React from "react";
import { Value } from "slate";

import ClearBlockFormattingPlugin from "./plugins/clearBlockFormatting";
import ClearMarkFormattingPlugin from "./plugins/clearMarkFormatting";
import CommandsAndQueriesPlugin from "./plugins/commandsAndQueries";

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
import { ListPlugins } from "./plugins/list";
import { ImagePlugins } from "./plugins/image";
import ParagraphPlugin from "./plugins/paragraph";

import EditorToolbar from "./components/EditorToolbar";
import EditorContent from "./components/EditorContent";
import Editor from "./components/Editor";

import { EMPTY_EDITOR_VALUE } from "./constants";

const plugins = [
    // utility plugins
    CommandsAndQueriesPlugin(),
    ClearBlockFormattingPlugin({
        keyName: "backspace",
        exitCondition: (value) => value.document.getBlocks().size > 1 && value.document.text !== ""
    }),
    ClearMarkFormattingPlugin({
        keyName: "enter"
    }),

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
    ...ImagePlugins(),
    ...ListPlugins(),
    ...ParagraphPlugin()
];

export default class WikiEditor extends React.Component {
    state = {
        value: Value.fromJSON(EMPTY_EDITOR_VALUE),
        showToolbar: false
    };

    editorRef = React.createRef();

    onChange = ({ value }) => {
        this.setState({ value });
    };

    componentDidMount() {
        // This is so we wait until editorRef is available
        this.setState({ showToolbar: true });
    }

    render() {
        const { placeholder, uploadFileHandler, uploadLoadingComponent } = this.props;
        const { value, showToolbar } = this.state;

        return (
            <React.Fragment>
                {showToolbar && (
                    <EditorToolbar
                        value={value}
                        onChange={this.onChange}
                        editorRef={this.editorRef}
                    />
                )}
                <EditorContent>
                    <Editor
                        value={value}
                        plugins={plugins}
                        onChange={this.onChange}
                        // NOTE: not `ref`, see here: https://github.com/styled-components/styled-components/issues/102
                        // TODO There maybe a nicer solution for this, see: https://reactjs.org/docs/forwarding-refs.html
                        innerRef={this.editorRef}
                        // custom props
                        placeholder={placeholder}
                        uploadFileHandler={uploadFileHandler}
                        uploadLoadingComponent={uploadLoadingComponent}
                    />
                </EditorContent>
            </React.Fragment>
        );
    }
}
