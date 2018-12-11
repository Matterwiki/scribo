import React from "react";
import { Value } from "slate";

import ClearBlockFormattingPlugin from "./plugins/clearBlockFormatting";
import ClearMarkFormattingPlugin from "./plugins/clearMarkFormatting";
import CommandsAndQueriesPlugin from "./plugins/commandsAndQueries";

import { BoldPlugins, BoldToolbarButton } from "./plugins/bold";
import { ItalicPlugins, ItalicToolbarButton } from "./plugins/italic";
import { CodePlugins, CodeToolbarButton } from "./plugins/code";
import { StrikeThroughPlugins, StrikeThroughToolbarButton } from "./plugins/strikeThrough";
import { UnderlinedPlugins, UnderlinedToolbarButton } from "./plugins/underlined";
import { LinkPlugins, LinkToolbarButton } from "./plugins/link/index";
import { EmojiPlugins, EmojiToolbarButton } from "./plugins/emoji/index";
import {
    HeadingPlugins,
    HeadingOneButton,
    HeadingTwoButton,
    HeadingThreeButton
} from "./plugins/heading";
import { BlockQuotePlugins, BlockQuoteButton } from "./plugins/blockQuote";
import { CodeBlockPlugins, CodeBlockButton } from "./plugins/codeBlock";
import { ListPlugins, NumberedListButton, BullettedListButton } from "./plugins/list";
import { ImagePlugins, ImageBlockButton } from "./plugins/image";
import { TablePlugins, TableToolbarButton } from "./plugins/table";

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
        exitCondition: (value) => value.document.text !== ""
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
    ...TablePlugins(),
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
        // This is to defer rendering of the toolbar until after `editorRef` is active.
        // Doing this saves us from null checking in the toolbar components that use the ref.
        this.setState({ showToolbar: true });
    }

    render() {
        const { showToolbar } = this.state;

        return (
            <React.Fragment>
                {showToolbar && this.renderToolbar()}
                <EditorContent>{this.renderEditor()}</EditorContent>
            </React.Fragment>
        );
    }

    renderToolbar() {
        const { value } = this.state;

        const toolbarProps = {
            value,
            onChange: this.onChange,
            editorRef: this.editorRef.current
        };

        return (
            <EditorToolbar>
                <BoldToolbarButton {...toolbarProps} />
                <ItalicToolbarButton {...toolbarProps} />
                <CodeToolbarButton {...toolbarProps} />
                <StrikeThroughToolbarButton {...toolbarProps} />
                <UnderlinedToolbarButton {...toolbarProps} />
                <LinkToolbarButton {...toolbarProps} />
                <HeadingOneButton {...toolbarProps} />
                <HeadingTwoButton {...toolbarProps} />
                <HeadingThreeButton {...toolbarProps} />
                <ImageBlockButton {...toolbarProps} />
                <BlockQuoteButton {...toolbarProps} />
                <CodeBlockButton {...toolbarProps} />
                <NumberedListButton {...toolbarProps} />
                <BullettedListButton {...toolbarProps} />
                <EmojiToolbarButton {...toolbarProps} />
                <TableToolbarButton {...toolbarProps} />
            </EditorToolbar>
        );
    }

    renderEditor() {
        const { placeholder, uploadFileHandler, uploadLoadingComponent } = this.props;
        const { value } = this.state;

        return (
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
        );
    }
}
