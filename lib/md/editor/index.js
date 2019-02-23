import React from "react";

import ReadOnlyEditor from "../../common/components/ReadOnlyEditor";
import PlainTextEditor from "../../common/components/Editor";
import EditorToolbar from "../../common/components/EditorToolbar";
import EditorContent from "../../common/components/EditorContent";
import { ImageNode } from "../../common/components/EditorNodes";

import { PreviewButton, ImageButton } from "./components/ToolbarButtons/index";

import { fromJSON } from "../jsonUtils";
import { convertPlainTextSchemaToScriboSchema } from "./utils";

import { NODE_TYPES, EMPTY_EDITOR_VALUE } from "../../common/constants";

export default class MarkdownEditor extends React.Component {
    state = {
        inPreviewMode: false,
        showToolbar: false,
        value: null
    };

    editorRef = null;

    setEditorRef = (ref) => {
        this.editorRef = ref;

        // `editorRef` will be `null` until it is attached to the `Editor` component
        // This ensures that we show the toolbar only when we've obtained the ref
        this.setState({ showToolbar: true });
    };

    componentDidMount() {
        // if value was passed to this editor, update the state with that value or use default value
        // TODO Enforce validation that ensures that we _always_ get a value from user land.
        //      This way, we relenquish control of this.state.value! 🍾
        const value = this.props.value || fromJSON(EMPTY_EDITOR_VALUE);

        this.setState({ value });
    }

    handlePreviewClick = () => {
        this.setState((prevState) => ({
            inPreviewMode: !prevState.inPreviewMode
        }));
    };

    onChange = ({ value }) => {
        this.setState({ value });

        // Pass value back to user land
        this.props.onValueChanged(value);
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
        const editor = this.editorRef;
        return (
            <EditorToolbar>
                {/* TODO Find a way to "internalize" these props with a combination of slate queries and commands */}
                <PreviewButton active={inPreviewMode} onPreviewClick={this.handlePreviewClick} />
                {!inPreviewMode && <ImageButton editor={editor} />}
            </EditorToolbar>
        );
    }

    renderEditor() {
        const { readOnly } = this.props;
        const { inPreviewMode } = this.state;

        if (inPreviewMode || readOnly) return this.renderReadOnlyEditor();

        return this.renderPlainTextEditor();
    }

    renderReadOnlyEditor() {
        const { value } = this.state;

        /**
         * We need to do this "double conversion" because `this.state.value` uses
         * the Plain text serializer's schema, while `ReadOnlyEditor` expects a `value`
         * that works with scribo's schema.
         */
        const slateValue = convertPlainTextSchemaToScriboSchema(value);

        return <ReadOnlyEditor value={slateValue} />;
    }

    renderPlainTextEditor() {
        const { imageUploadOptions, placeholder } = this.props;
        const { value } = this.state;

        return (
            <PlainTextEditor
                value={value}
                placeholder={placeholder}
                imageUploadOptions={imageUploadOptions}
                onChange={this.onChange}
                renderNode={this.renderMdNode}
                // NOTE: not `ref`, see here: https://github.com/styled-components/styled-components/issues/102
                // Also NOTE: using callback ref, not `React.createRef()`, so we can control when we can show the editor toolbar
                // TODO There maybe a nicer solution for this, see: https://reactjs.org/docs/forwarding-refs.html
                innerRef={this.setEditorRef}
            />
        );
    }
}
