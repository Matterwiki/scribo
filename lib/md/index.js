import React from "react";
import { Value } from "slate";

import EditorToolbar from "../common/components/EditorToolbar";
import EditorContent from "../common/components/EditorContent";
import Editor from "../common/components/Editor";

import { PreviewButton, ImageButton } from "./components/ToolbarButtons/index";

import { NODE_TYPES, EMPTY_EDITOR_VALUE } from "../common/constants";
import { ImageNode } from "../common/components/EditorNodes";
import ReadOnlyEditor from "../common/components/ReadOnlyEditor";

import MdSerializer from "./serializers/mdSerializer";
import PlainSerializer from "./serializers/plainSerializer";

const md = new MdSerializer();
const plain = new PlainSerializer();

export default class MarkdownEditor extends React.Component {
    state = {
        inPreviewMode: false,
        showToolbar: false,
        value: null
    };

    editorRef = React.createRef();

    componentDidMount() {
        this.setState((prevState) => {
            const value = this.props.value
                ? plain.deserialize(md.serialize(Value.fromJSON(this.props.value)))
                : prevState.value;

            // TODO This may be an anti pattern...
            this.props.onValueChanged(md.deserialize(plain.serialize(value)));

            return {
                // if value was passed to this editor, update the state with that value
                value,
                // This flag is used to defer rendering of the toolbar until slate has initialized `editorRef`.
                // Doing this saves us from null checking in the toolbar components that use the ref.
                showToolbar: true
            };
        });
    }

    handlePreviewClick = () => {
        this.setState((prevState) => ({
            inPreviewMode: !prevState.inPreviewMode
        }));
    };

    onChange = ({ value }) => {
        this.setState({ value });

        // TODO Could slow things down very badly
        // What if we relenquish this formatting control to the user?
        // We could make a new class called `Value` that, when initialized with JSON values, does all these formatting things by itself....
        this.props.onValueChanged(md.deserialize(plain.serialize(value)));
    };

    renderMdNode = (props, editor, next) => {
        switch (props.node.type) {
            case NODE_TYPES.IMAGE:
                return <ImageNode {...props} md />;
            default:
                return next();
        }
    };

    render() {
        const { showToolbar, value } = this.state;
        return (
            <React.Fragment>
                {showToolbar && this.renderToolbar()}
                <EditorContent>{value && this.renderEditor()}</EditorContent>
            </React.Fragment>
        );
    }

    renderToolbar() {
        const { inPreviewMode } = this.state;
        const editorRef = this.editorRef.current;
        return (
            <EditorToolbar>
                {/* TODO Find a way to "internalize" these props with a combination of slate queries and commands */}
                <PreviewButton active={inPreviewMode} onPreviewClick={this.handlePreviewClick} />
                {!inPreviewMode && <ImageButton editorRef={editorRef} />}
            </EditorToolbar>
        );
    }

    renderEditor() {
        const { imageUploadOptions, placeholder, readOnly } = this.props;
        const { inPreviewMode, value } = this.state;

        if (inPreviewMode || readOnly) {
            return <ReadOnlyEditor value={md.deserialize(plain.serialize(value))} />;
        }

        return (
            <Editor
                value={value}
                placeholder={placeholder}
                imageUploadOptions={imageUploadOptions}
                onChange={this.onChange}
                renderNode={this.renderMdNode}
                // NOTE: not `ref`, see here: https://github.com/styled-components/styled-components/issues/102
                // TODO There maybe a nicer solution for this, see: https://reactjs.org/docs/forwarding-refs.html
                innerRef={this.editorRef}
            />
        );
    }
}
