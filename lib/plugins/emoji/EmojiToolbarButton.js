import React from "react";

import data from "emoji-mart/data/emojione.json";
import { NimblePicker } from "emoji-mart";

import EmojiIcon from "quill-icons/lib/icons/emoji";

import { ToolbarButton, ToolbarIcon, ToolbarPopover } from "../../components";

import { insertEmoji } from "./utils";

import "emoji-mart/css/emoji-mart.css";

export default class EmojiToolbarButton extends React.Component {
    state = { popupVisible: false };

    togglePopupVisibility = (override) => {
        this.setState((prevState) => {
            return {
                popupVisible: typeof override === "boolean" ? override : !prevState.popupVisible
            };
        });
    };

    onEmojiSelected = (emoji) => {
        const { value, onChange } = this.props;
        const change = value.change();

        insertEmoji(change, emoji);

        onChange(change);
    };

    render() {
        const { value, onChange, ...rest } = this.props;

        return (
            <React.Fragment>
                <ToolbarButton id="emoji-button" onClick={this.togglePopupVisibility} {...rest}>
                    <ToolbarIcon icon={EmojiIcon} />
                </ToolbarButton>
                <ToolbarPopover visible={this.state.popupVisible} parent="#emoji-button">
                    <NimblePicker set="emojione" data={data} onSelect={this.onEmojiSelected} />
                </ToolbarPopover>
            </React.Fragment>
        );
    }
}
