import React from "react";

import data from "emoji-mart/data/emojione.json";
import { NimblePicker } from "emoji-mart";

import EmojiIcon from "quill-icons/lib/icons/emoji";

import ToolbarButton from "../../components/ToolbarButton";
import ToolbarIcon from "../../components/ToolbarIcon";
import ToolbarPopover from "../../components/ToolbarPopover";

import { insertEmoji } from "./utils";

import "emoji-mart/css/emoji-mart.css";

export default class EmojiToolbarButton extends React.Component {
    state = { popupVisible: false };

    togglePopupVisibility = (override) => {
        this.setState((prevState) => ({
            popupVisible: typeof override === "boolean" ? override : !prevState.popupVisible
        }));
    };

    onEmojiSelected = (emoji) => {
        const { value, onChange } = this.props;
        const change = value.change();

        insertEmoji(change, emoji);

        onChange(change);
    };

    render() {
        const { value, onChange, ...rest } = this.props;
        const { popupVisible } = this.state;

        return (
            <ToolbarPopover
                visible={popupVisible}
                onClickOutside={() => this.togglePopupVisibility(false)}
                content={
                    <NimblePicker
                        set="emojione"
                        autoFocus
                        data={data}
                        onSelect={this.onEmojiSelected}
                    />
                }>
                <ToolbarButton onClick={this.togglePopupVisibility} {...rest}>
                    <ToolbarIcon icon={EmojiIcon} />
                </ToolbarButton>
            </ToolbarPopover>
        );
    }
}
