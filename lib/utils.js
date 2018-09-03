import isKeyHotkey from "is-hotkey";

export function hasMark(value, type) {
    return value.activeMarks.some((mark) => mark.type === type);
}

export function toggleMark(change, type) {
    return change.toggleMark(type).focus();
}

export const onKeyDown = (type, keyCombination) => (event, change) => {
    // setup keyboard hotkey checker
    const matchesHotKey = isKeyHotkey(keyCombination);

    // if this is not it, move out!
    if (!matchesHotKey(event)) return;

    event.preventDefault();
    toggleMark(change, type);
    return true;
};
