import React from "react";
import styled from "styled-components";

import { NimblePicker } from "emoji-mart";

import data from "emoji-mart/data/emojione.json";

import "emoji-mart/css/emoji-mart.css";

const StyledEmojiPickerContainer = styled.div`
    .emoji-mart {
        border: none;

        .emoji-mart-emoji {
            cursor: pointer;

            span {
                cursor: pointer;
            }
        }

        .emoji-mart-bar {
            display: none;
        }
    }
`;

export default function EmojiPopover({ onSelect, ...props }) {
    return (
        <StyledEmojiPickerContainer>
            <NimblePicker set="emojione" autoFocus data={data} onSelect={onSelect} {...props} />
        </StyledEmojiPickerContainer>
    );
}
