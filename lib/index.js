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

import "flexboxgrid/css/flexboxgrid.css";

const plugins = [
    BoldPlugin(),
    ItalicPlugin(),
    CodePlugin(),
    StrikeThroughPlugin(),
    UnderlinedPlugin(),
    LinkPlugin()
];

export default class ScriboEditor extends React.Component {
    state = {
        value: Value.fromJSON(EMPTY_EDITOR_VALUE)
    };

    onChange = ({ value }) => {
        this.setState({ value });
    };

    render() {
        const { placeholder } = this.props;
        const { value, showLinkPopup } = this.state;

        const toolbarProps = { value, onChange: this.onChange };

        return (
            <React.Fragment>
                <div className="row scribo-editor-toolbar">
                    <BoldToolbarButton {...toolbarProps} />
                    <ItalicToolbarButton {...toolbarProps} />
                    <CodeToolbarButton {...toolbarProps} />
                    <StrikeThroughToolbarButton {...toolbarProps} />
                    <UnderlinedToolbarButton {...toolbarProps} />
                    <LinkToolbarButton {...toolbarProps} />
                </div>
                <div className="row scribo-editor-content">
                    <Editor
                        showLinkPopup={showLinkPopup}
                        className="col-xs"
                        value={value}
                        placeholder={placeholder}
                        plugins={plugins}
                        onChange={this.onChange}
                        renderMark={this.renderMark}
                        renderNode={this.renderNode}
                    />
                </div>
            </React.Fragment>
        );
    }
}
