import React from "react";

import { FaSmile } from "react-icons/fa";

import ToolbarButton from "../../components/ToolbarButton";
import ToolbarPopover from "../../components/ToolbarPopover";

import EmojiPopover from "./EmojiPopover";

import { insertEmoji } from "./utils";

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
                content={<EmojiPopover onSelect={this.onEmojiSelected} />}>
                <ToolbarButton icon={FaSmile} onClick={this.togglePopupVisibility} {...rest} />
            </ToolbarPopover>
        );
    }
}
