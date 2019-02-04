import React from "react";
import { Value } from "slate";

import EditorToolbar from "../common/components/EditorToolbar";
import EditorContent from "../common/components/EditorContent";
import Editor from "../common/components/Editor";

import { PreviewButton, ImageButton } from "./components/ToolbarButtons/index";

import { renderMark, renderNode } from "../common/renderers";
import { NODE_TYPES, EMPTY_EDITOR_VALUE } from "../common/constants";
import { ImageNode } from "../common/components/EditorNodes";

import MdSerializer from "./serializers/mdSerializer";
import PlainSerializer from "./serializers/plainSerializer";

const md = new MdSerializer();
const plain = new PlainSerializer();

const emptyMdString = md.serialize(Value.fromJSON(EMPTY_EDITOR_VALUE));

export default class MarkdownEditor extends React.Component {
    state = {
        inPreviewMode: false,
        showToolbar: true,
        value: plain.deserialize(emptyMdString)
    };

    editorRef = React.createRef();

    componentDidMount() {
        // This flag is used to defer rendering of the toolbar until slate has initialized `editorRef`.
        // Doing this saves us from null checking in the toolbar components that use the ref.
        this.setState({ showToolbar: true });
    }

    handlePreviewClick = () => {
        this.setState((prevState) => ({
            inPreviewMode: !prevState.inPreviewMode
        }));
    };

    onChange = ({ value }) => {
        this.setState({ value });
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
        const { showToolbar } = this.state;
        return (
            <React.Fragment>
                {showToolbar && this.renderToolbar()}
                <EditorContent>{this.renderEditor()}</EditorContent>
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
        const { imageUploadOptions, placeholder } = this.props;
        const { inPreviewMode, value } = this.state;

        // TODO Split this into two editors ie PlainMdEditor and ReadOnlyEditor
        const editorProps = inPreviewMode
            ? {
                  value: md.deserialize(plain.serialize(value)),
                  readOnly: true,
                  renderMark,
                  renderNode,
                  imageUploadOptions
              }
            : {
                  value,
                  placeholder,
                  imageUploadOptions,
                  onChange: this.onChange,
                  renderNode: this.renderMdNode,
                  // NOTE: not `ref`, see here: https://github.com/styled-components/styled-components/issues/102
                  // TODO There maybe a nicer solution for this, see: https://reactjs.org/docs/forwarding-refs.html
                  innerRef: this.editorRef
              };

        return <Editor {...editorProps} />;
    }
}
