export function hasLink(value) {
    return value.inlines.some((inline) => inline.type === "link");
}

export function wrapLink(change, href) {
    change
        .wrapInline({
            type: "link",
            data: { href }
        })
        .moveToEnd()
        .focus();
}

export function unwrapLink(change) {
    change.unwrapInline("link").focus();
}

export function getLinkData(value) {
    if (!hasLink(value)) return;

    const node = value.inlines.find((inline) => inline.type === "link");
    return node.data.toJS();
}

export function handleLinkCreateOrUpdate(value, href) {
    const change = value.change();
    const currentLinkData = getLinkData(value);

    // For an existing link node, update property
    if (currentLinkData && currentLinkData.href) {
        change.setInlines({
            type: "link",
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
