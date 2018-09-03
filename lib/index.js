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

        return (
            <React.Fragment>
                <div className="row scribo-editor-toolbar">
                    <BoldToolbarButton value={value} onChange={this.onChange} />
                    <ItalicToolbarButton value={value} onChange={this.onChange} />
                    <CodeToolbarButton value={value} onChange={this.onChange} />
                    <StrikeThroughToolbarButton value={value} onChange={this.onChange} />
                    <UnderlinedToolbarButton value={value} onChange={this.onChange} />
                    <LinkToolbarButton value={value} onChange={this.onChange} />
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
