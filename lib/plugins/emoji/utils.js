export function insertEmoji(change, nativeEmoji) {
    change
        .insertInline({
            type: "emoji",
            data: { nativeEmoji }
        })
        .moveToStartOfNextText()
        .insertText(" ")
        .focus();
}
