import { DEFAULT_NODE, NODE_TYPES } from "./constants";

export function hasMark(value, type) {
    return value.activeMarks.some((mark) => mark.type === type);
}

export function hasBlock(value, type) {
    return value.blocks.some((node) => node.type === type);
}

export function toggleMark(change, type) {
    return change.toggleMark(type).focus();
}

function cleanupLists(change, isList) {
    if (isList) change.unwrapBlock(NODE_TYPES.BULLETTED_LIST).unwrapBlock(NODE_TYPES.NUMBERED_LIST);

    return change;
}

export function addOrRemoveBlock(value, type) {
    const hasBlockInRange = hasBlock(value, type);
    const isList = hasBlock(value, NODE_TYPES.LIST_ITEM);

    const change = value.change();
    const { document, anchorKey } = value;

    // Block already exists, switch to paragraph
    if (hasBlockInRange) {
        change.setBlocks(DEFAULT_NODE).call(cleanupLists, isList);
    } else {
        // Block needs to be set!
        change.setBlocks(type).call(cleanupLists, isList);

        // Insert empty paragraph block if there is nothing below inserted block
        if (!document.getNextBlock(anchorKey)) {
            change.insertBlock(DEFAULT_NODE).moveToStartOfPreviousBlock();
        }
    }

    change.focus();

    return change;
}

export function insertEmoji(change, nativeEmoji) {
    change
        .insertInline({
            type: NODE_TYPES.EMOJI,
            data: { nativeEmoji }
        })
        .moveToStartOfNextText()
        .insertText(" ")
        .focus();
}

export function hasLink(value) {
    return value.inlines.some((inline) => inline.type === NODE_TYPES.LINK);
}

export function wrapLink(change, href) {
    change
        .wrapInline({
            type: NODE_TYPES.LINK,
            data: { href }
        })
        .moveToEnd()
        .focus();
}

export function unwrapLink(change) {
    change.unwrapInline(NODE_TYPES.LINK).focus();
}

export function getLinkData(value) {
    if (!hasLink(value)) return;

    const node = value.inlines.find((inline) => inline.type === NODE_TYPES.LINK);
    return node.data.toJS();
}

export function handleLinkCreateOrUpdate(value, href) {
    const change = value.change();
    const currentLinkData = getLinkData(value);

    // For an existing link node, update property
    if (currentLinkData && currentLinkData.href) {
        change.setInlines({
            type: NODE_TYPES.LINK,
            data: { href }
        });
    }
    // If link did not exist for selected text, add inline link to the selected text
    else if (value.isExpanded) {
        change.call(wrapLink, href);
    }
    // For all other cases, insert url as text and add inline link to text
    else {
        change
            .insertText(href)
            .extend(0 - href.length)
            .call(wrapLink, href);
    }

    return change;
}

export function handleLinkRemove(value) {
    const change = value.change();

    change.call(unwrapLink);

    return change;
}

export function hasList() {}
export function addOrRemoveList() {}
