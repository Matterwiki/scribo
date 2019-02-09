import React from "react";
import { Value } from "slate";

import { EMPTY_EDITOR_VALUE } from "../common/constants";

import plugins from "./plugins/index";

import EditorToolbar from "../common/components/EditorToolbar";
import EditorContent from "../common/components/EditorContent";
import Editor from "../common/components/Editor";
import {
    BoldButton,
    ItalicButton,
    UnderlinedButton,
    CodeButton,
    StrikeThroughButton,
    BlockQuoteButton,
    BulletedListButton,
    NumberedListButton,
    CodeBlockButton,
    HeadingOneButton,
    HeadingTwoButton,
    HeadingThreeButton,
    ImageButton,
    TableButton,
    LinkButton
} from "./components/ToolbarButtons/index";

import { renderMark, renderNode } from "../common/renderers";

export default class WYSISWYGEditor extends React.Component {
    state = {
        value: Value.fromJSON(EMPTY_EDITOR_VALUE),
        showToolbar: false
    };

    editorRef = React.createRef();

    onChange = ({ value }) => {
        this.setState({ value });
    };

    componentDidMount() {
        // This flag is used to defer rendering of the toolbar until slate has initialized `editorRef`.
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
                <BoldButton {...toolbarProps} />
                <ItalicButton {...toolbarProps} />
                <CodeButton {...toolbarProps} />
                <StrikeThroughButton {...toolbarProps} />
                <UnderlinedButton {...toolbarProps} />
                <LinkButton {...toolbarProps} />
                <HeadingOneButton {...toolbarProps} />
                <HeadingTwoButton {...toolbarProps} />
                <HeadingThreeButton {...toolbarProps} />
                <ImageButton {...toolbarProps} />
                <BlockQuoteButton {...toolbarProps} />
                <CodeBlockButton {...toolbarProps} />
                <NumberedListButton {...toolbarProps} />
                <BulletedListButton {...toolbarProps} />
                <TableButton {...toolbarProps} />
            </EditorToolbar>
        );
    }

    renderEditor() {
        const { placeholder, imageUploadOptions, readOnly } = this.props;
        const { value } = this.state;

        // TODO Add readonly editor to this thingie

        return (
            <Editor
                value={value}
                plugins={plugins}
                renderMark={renderMark}
                renderNode={renderNode}
                imageUploadOptions={imageUploadOptions}
                onChange={this.onChange}
                // NOTE: not `ref`, see here: https://github.com/styled-components/styled-components/issues/102
                // TODO There maybe a nicer solution for this, see: https://reactjs.org/docs/forwarding-refs.html
                innerRef={this.editorRef}
                // custom props
                placeholder={placeholder}
            />
        );
    }
}
