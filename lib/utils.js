import isKeyHotkey from "is-hotkey";

import { DEFAULT_NODE } from "./constants";

export function hasMark(value, type) {
    return value.activeMarks.some((mark) => mark.type === type);
}

export function hasBlock(value, type) {
    return value.blocks.some((node) => node.type === type);
}

export function toggleMark(change, type) {
    return change.toggleMark(type).focus();
}

export function addOrRemoveBlock(value, type) {
    const hasBlockInRange = hasBlock(value, type);
    const change = value.change();

    change.setBlocks(hasBlockInRange ? DEFAULT_NODE : type).focus();

    return change;
}

export function generateMarkKeyDownEvent(type, keyCombination) {
    return function onKeyDown(event, change) {
        // setup keyboard hotkey checker
        const matchesHotKey = isKeyHotkey(keyCombination);

        // if this is not it, move out!
        if (!matchesHotKey(event)) return;

        event.preventDefault();
        toggleMark(change, type);
        return true;
    };
}

/**
 * Clear block formatting if the editor text is empty.
 */
export function generateClearFormattingKeyDownEvent() {
    return function onKeyDown(event, change) {
        const matchesHotKey = isKeyHotkey("backspace");

        if (
            matchesHotKey(event) &&
            change.value.document.getBlocks().size === 1 &&
            change.value.document.text === ""
        ) {
            change.setBlocks(DEFAULT_NODE).focus();
        }
    };
}
