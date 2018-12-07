import React from "react";
import isBoolean from "lodash.isboolean";
import { FaSmile } from "react-icons/fa";

import ToolbarButton from "../../components/ToolbarButton";
import ToolbarPopover from "../../components/ToolbarPopover";

import EmojiPopover from "./EmojiPopover";

export default class EmojiToolbarButton extends React.Component {
    state = { popupVisible: false };

    togglePopupVisibility = (override) => {
        this.setState((prevState) => ({
            popupVisible: isBoolean(override) ? override : !prevState.popupVisible
        }));
    };

    onEmojiSelected = (emoji) => {
        const { editorRef: editor } = this.props;
        editor.insertEmoji(emoji);
    };

    render() {
        const { value, onChange, editorRef: editor, ...rest } = this.props;
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
