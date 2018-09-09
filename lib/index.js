import React from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

import { EMPTY_EDITOR_VALUE, DEFAULT_NODE } from "./constants";

import { BoldPlugin } from "./plugins/bold";
import { ItalicPlugin } from "./plugins/italic";
import { CodePlugin } from "./plugins/code";
import { StrikeThroughPlugin } from "./plugins/strikeThrough";
import { UnderlinedPlugin } from "./plugins/underlined";
import { LinkPlugin } from "./plugins/link/index";
import { EmojiPlugin } from "./plugins/emoji/index";

import ScriboToolbar from "./components/ScriboToolbar";

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
                <ScriboToolbar value={value} onChange={this.onChange} />
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
