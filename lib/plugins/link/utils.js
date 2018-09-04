export function hasLink(value) {
    return value.inlines.some((inline) => inline.type === "link");
}

export function getLink(value) {
    if (!hasLink(value)) return;

    const node = value.inlines.find((inline) => inline.type === "link");
    return node.data.get("href");
}

export function wrapLink(change, href) {
    change.wrapInline({
        type: "link",
        data: { href }
    });

    change.moveToEnd().focus();
}

export function unwrapLink(change) {
    change.unwrapInline("link").focus();
}
