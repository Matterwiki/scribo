import React from 'react';

import { EMPTY_EDITOR_VALUE } from '../../common/constants';

import plugins from './plugins/index';

import EditorToolbar from '../../common/components/EditorToolbar';
import EditorContent from '../../common/components/EditorContent';
import Editor from '../../common/components/Editor';
import ReadOnlyEditor from '../../common/components/ReadOnlyEditor';

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
} from './components/ToolbarButtons/index';

import { renderMark, renderBlock, renderInline } from '../../common/renderers';
import { fromJSON } from '../jsonUtils';

export default class WYSISWYGEditor extends React.Component {
  state = { value: null, showToolbar: false };

  editorRef = null;

  setEditorRef = ref => {
    this.editorRef = ref;

    // `editorRef` will be `null` until it is attached to the `Editor` component
    // This ensures that we show the toolbar only when we've obtained the ref
    this.setState({ showToolbar: true });
  };

  handleChange = ({ value }) => {
    this.setState({ value });

    // Pass value back to user land
    this.props.onValueChanged(value);
  };

  componentDidMount () {
    // if value was passed to this editor, update the state with that value or use default value
    // TODO Enforce validation that ensures that we _always_ get a value from user land.
    //      This way, we relenquish control of this.state.value! 🍾
    const value = this.props.value || fromJSON(EMPTY_EDITOR_VALUE);

    // TODO This assumes that once the value from user land will not get updated, which is bad.
    //      We should be able to update from userland at any point!
    this.setState({ value });
  }

  render () {
    const { value, showToolbar } = this.state;
    const { readOnly } = this.props;

    return (
      <>
        {!readOnly && showToolbar && this.renderToolbar()}

        {!!value && (
          <EditorContent>
            {readOnly
              ? this.renderReadOnlyEditor()
              : this.renderWYSIWYGEditor()}
          </EditorContent>
        )}
      </>
    );
  }

  renderToolbar () {
    const { value } = this.state;

    const toolbarProps = {
      value,
      handleChange: this.handleChange,
      editor: this.editorRef
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

  renderEditor () {
    const { readOnly } = this.props;

    if (readOnly) return this.renderReadOnlyEditor();

    return this.renderWYSIWYGEditor();
  }

  renderReadOnlyEditor () {
    const { value } = this.state;
    return <ReadOnlyEditor value={value} />;
  }

  renderWYSIWYGEditor () {
    const { placeholder, imageUploadOptions } = this.props;
    const { value } = this.state;

    return (
      <Editor
        value={value}
        plugins={plugins}
        renderMark={renderMark}
        renderBlock={renderBlock}
        renderInline={renderInline}
        imageUploadOptions={imageUploadOptions}
        onChange={this.handleChange}
        // NOTE: not `ref`, see here: https://github.com/styled-components/styled-components/issues/102
        // Also NOTE: using callback ref, not `React.createRef()`, so we can control when we can show the editor toolbar
        // TODO There maybe a nicer solution for this, see: https://reactjs.org/docs/forwarding-refs.html
        innerRef={this.setEditorRef}
        // custom props
        placeholder={placeholder}
      />
    );
  }
}
