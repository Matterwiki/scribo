import React from "react";

import { BoldToolbarButton } from "../plugins/bold";
import { ItalicToolbarButton } from "../plugins/italic";
import { CodeToolbarButton } from "../plugins/code";
import { StrikeThroughToolbarButton } from "../plugins/strikeThrough";
import { UnderlinedToolbarButton } from "../plugins/underlined";
import { LinkToolbarButton } from "../plugins/link/index";
import { EmojiToolbarButton } from "../plugins/emoji/index";

export default class ScriboToolbar extends React.Component {
    // TODO Research to see if there is some other soln for this
    // These refs are used to toggle the visibility of popovers created by children
    linkBtnRef = React.createRef();

    emojiBtnRef = React.createRef();

    onClick = () => {
        const { onClick } = this.props;

        this.linkBtnRef.current.togglePopupVisibility(false);
        this.emojiBtnRef.current.togglePopupVisibility(false);

        onClick();
    };

    render() {
        // setup nasty props!!!
        const toolbarProps = this.props;

        return (
            <div className="row scribo-editor-toolbar">
                <BoldToolbarButton {...toolbarProps} />
                <ItalicToolbarButton {...toolbarProps} />
                <CodeToolbarButton {...toolbarProps} />
                <StrikeThroughToolbarButton {...toolbarProps} />
                <UnderlinedToolbarButton {...toolbarProps} />
                <LinkToolbarButton ref={this.linkBtnRef} {...toolbarProps} />
                <EmojiToolbarButton ref={this.emojiBtnRef} {...toolbarProps} />
            </div>
        );
    }
}
