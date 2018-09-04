import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

import { EMPTY_EDITOR_VALUE, DEFAULT_NODE } from "./constants";

import { BoldPlugin, BoldToolbarButton } from "./plugins/bold";
import { ItalicPlugin, ItalicToolbarButton } from "./plugins/italic";
import { CodePlugin, CodeToolbarButton } from "./plugins/code";
import { StrikeThroughPlugin, StrikeThroughToolbarButton } from "./plugins/strikeThrough";
import { UnderlinedPlugin, UnderlinedToolbarButton } from "./plugins/underlined";
import { LinkPlugin, LinkToolbarButton } from "./plugins/link/index";
import { EmojiPlugin, EmojiToolbarButton } from "./plugins/emoji/index";

import "flexboxgrid/css/flexboxgrid.css";

const plugins = [
    BoldPlugin(),
    ItalicPlugin(),
    CodePlugin(),
    StrikeThroughPlugin(),
    UnderlinedPlugin(),
    LinkPlugin(),
    EmojiPlugin()
];

export default class ScriboEditor extends React.Component {
    state = {
        value: Value.fromJSON(EMPTY_EDITOR_VALUE)
    };

    // TODO Research to see if there is some other soln for this
    // These refs are used to toggle the visibility of popovers created by children
    linkBtnRef = React.createRef();
    emojiBtnRef = React.createRef();

    onChange = ({ value }) => {
        this.setState({ value });
    };

    onFocus = () => {
        this.linkBtnRef.current.togglePopupVisibility(false);
        this.emojiBtnRef.current.togglePopupVisibility(false);
    };

    render() {
        const { placeholder } = this.props;
        const { value } = this.state;

        const toolbarProps = { value, onChange: this.onChange };

        return (
            <React.Fragment>
                <div className="row scribo-editor-toolbar">
                    <BoldToolbarButton {...toolbarProps} />
                    <ItalicToolbarButton {...toolbarProps} />
                    <CodeToolbarButton {...toolbarProps} />
                    <StrikeThroughToolbarButton {...toolbarProps} />
                    <UnderlinedToolbarButton {...toolbarProps} />
                    <LinkToolbarButton ref={this.linkBtnRef} {...toolbarProps} />
                    <EmojiToolbarButton ref={this.emojiBtnRef} {...toolbarProps} />
                </div>
                <div className="row scribo-editor-content">
                    <Editor
                        className="col-xs"
                        value={value}
                        placeholder={placeholder}
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
