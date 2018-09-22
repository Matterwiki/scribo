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
    const { document, anchorKey } = value;

    // Block already exists, switch to paragraph
    if (hasBlockInRange) {
        change.setBlocks(DEFAULT_NODE);
    } else {
        // Block needs to be set!
        change.setBlocks(type);

        // Insert empty paragraph block if there is nothing below inserted block
        if (!document.getNextBlock(anchorKey)) {
            change.insertBlock(DEFAULT_NODE).moveToStartOfPreviousBlock();
        }
    }

    change.focus();

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
