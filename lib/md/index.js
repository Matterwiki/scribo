import React from "react";
import Plain from "slate-plain-serializer";

import { FaEye } from "react-icons/fa";

import EditorToolbar from "../common/components/EditorToolbar";
import EditorContent from "../common/components/EditorContent";
import Editor from "../common/components/Editor";

import ToolbarButton from "../common/components/ToolbarButton";

import { renderMark, renderNode } from "../common/renderers";
import MdSerializer from "./mdSerializer";

const mdSerializer = new MdSerializer();

export default class MarkdownEditor extends React.Component {
    state = {
        inPreviewMode: false,
        plainValue: Plain.deserialize("")
    };

    handlePreviewClick = () => {
        this.setState((prevState) => ({
            inPreviewMode: !prevState.inPreviewMode
        }));
    };

    onChange = ({ value }) => {
        this.setState({ plainValue: value });
    };

    render() {
        return (
            <React.Fragment>
                {this.renderToolbar()}
                <EditorContent>{this.renderEditor()}</EditorContent>
            </React.Fragment>
        );
    }

    renderToolbar() {
        const { inPreviewMode } = this.state;
        return (
            <EditorToolbar>
                <ToolbarButton
                    active={inPreviewMode}
                    icon={FaEye}
                    onClick={this.handlePreviewClick}
                />
            </EditorToolbar>
        );
    }

    renderEditor() {
        const { uploadFileHandler, uploadLoadingComponent, placeholder } = this.props;
        const { inPreviewMode, plainValue } = this.state;

        const editorProps = inPreviewMode
            ? {
                  value: mdSerializer.deserialize(Plain.serialize(plainValue)),
                  readOnly: true,
                  renderMark,
                  renderNode
              }
            : {
                  value: plainValue,
                  placeholder,
                  onChange: this.onChange,
                  uploadFileHandler,
                  uploadLoadingComponent
              };

        return <Editor {...editorProps} />;
    }
}
