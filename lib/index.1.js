import React from "react";
import { Editor, getEventTransfer } from "slate-react";
import { Value } from "slate";
import isUrl from "is-url";

import { MARK_BUTTONS, BLOCK_BUTTONS, INLINE_BUTTONS } from "./toolbarButtons";

import {
    EMPTY_EDITOR_VALUE,
    DEFAULT_NODE,
    MARK_TYPES,
    INLINE_TYPES,
    BLOCK_TYPES
} from "./constants";

import MarkHotKey from "./plugins/markHotKey";

import "flexboxgrid/css/flexboxgrid.css";

const initialValue = Value.fromJSON(EMPTY_EDITOR_VALUE);

const plugins = [
    MarkHotKey({ key: "b", type: MARK_TYPES.BOLD }),
    MarkHotKey({ key: "`", type: MARK_TYPES.CODE }),
    MarkHotKey({ key: "i", type: MARK_TYPES.ITALIC }),
    MarkHotKey({ key: "~", type: MARK_TYPES.STRIKETHROUGH }),
    MarkHotKey({ key: "u", type: MARK_TYPES.UNDERLINED })
];

function wrapLink(change, href) {
    change.wrapInline({
        type: INLINE_TYPES.LINK,
        data: { href }
    });

    change.moveToEnd();
}

function unwrapLink(change) {
    change.unwrapInline(INLINE_TYPES.LINK);
}

export default class ScriboEditor extends React.Component {
    state = {
        value: initialValue
    };

    hasMark = (type) => {
        const { value } = this.state;
        return value.activeMarks.some((mark) => mark.type === type);
    };

    hasBlock = (type) => {
        const { value } = this.state;
        return value.blocks.some((node) => node.type === type);
    };

    hasInline = (type) => {
        const { value } = this.state;
        return value.inlines.some((inline) => inline.type === type);
    };

    renderMark = (props) => {
        const { children, mark, attributes } = props;

        switch (mark.type) {
            case MARK_TYPES.BOLD:
                return <strong {...attributes}>{children}</strong>;
            case MARK_TYPES.CODE:
                return <code {...attributes}>{children}</code>;
            case MARK_TYPES.ITALIC:
                return <em {...attributes}>{children}</em>;
            case MARK_TYPES.UNDERLINED:
                return <u {...attributes}>{children}</u>;
            case MARK_TYPES.STRIKETHROUGH:
                return (
                    <span className="strikethrough-mark" {...props}>
                        {children}
                    </span>
                );
        }
    };

    renderBlock = (props) => {
        const { attributes, children, node } = props;

        switch (node.type) {
            case BLOCK_TYPES.BLOCK_QUOTE:
                return <blockquote {...attributes}>{children}</blockquote>;
            case BLOCK_TYPES.BULLETED_LIST:
                return <ul {...attributes}>{children}</ul>;
            case BLOCK_TYPES.HEADING_ONE:
                return <h1 {...attributes}>{children}</h1>;
            case BLOCK_TYPES.HEADING_TWO:
                return <h2 {...attributes}>{children}</h2>;
            case BLOCK_TYPES.HEADING_THREE:
                return <h3 {...attributes}>{children}</h3>;
            case BLOCK_TYPES.NUMBERED_LIST:
                return <ol {...attributes}>{children}</ol>;
            case INLINE_TYPES.LINK:
                return this.renderInline(props, INLINE_TYPES.LINK);
            case "list-item":
                return <li {...attributes}>{children}</li>;
        }
    };

    renderInline = ({ attributes, children, node }, type) => {
        const { data } = node;

        switch (type) {
            case INLINE_TYPES.LINK:
                const href = data.get("href");

                return (
                    <a {...attributes} href={href}>
                        {children}
                    </a>
                );
        }
    };

    onClickLink = (event) => {
        event.preventDefault();

        const { value } = this.state;
        const hasLinks = this.hasInline(INLINE_TYPES.LINK);
        const change = value.change();

        if (hasLinks) {
            change.call(unwrapLink);
        } else if (value.isExpanded) {
            const href = window.prompt("Enter the URL of the link:");
            change.call(wrapLink, href);
        } else {
            const href = window.prompt("Enter the URL of the link:");
            const text = window.prompt("Enter the text for the link:");

            change
                .insertText(text)
                .extend(0 - text.length)
                .call(wrapLink, href);
        }

        this.onChange(change);
    };

    onClickMark = (event, type) => {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change().toggleMark(type);
        this.onChange(change);
    };

    onClickBlock = (event, type) => {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change();
        const { document } = value;

        // Handle everything but list buttons.
        if (type !== "bulleted-list" && type !== "numbered-list") {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock("list-item");

            if (isList) {
                change
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock("bulleted-list")
                    .unwrapBlock("numbered-list");
            } else {
                change.setBlocks(isActive ? DEFAULT_NODE : type);
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock("list-item");
            const isType = value.blocks.some(
                (block) => !!document.getClosest(block.key, (parent) => parent.type === type)
            );

            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock("bulleted-list")
                    .unwrapBlock("numbered-list");
            } else if (isList) {
                change
                    .unwrapBlock(type === "bulleted-list" ? "numbered-list" : "bulleted-list")
                    .wrapBlock(type);
            } else {
                change.setBlocks("list-item").wrapBlock(type);
            }
        }

        this.onChange(change);
    };

    onChange = ({ value }) => {
        this.setState({ value });
    };

    onPaste = (event, change) => {
        if (change.value.selection.isCollapsed) return;

        const transfer = getEventTransfer(event);
        const { type, text } = transfer;
        if (type !== "text" && type !== "html") return;
        if (!isUrl(text)) return;

        if (this.hasLinks()) {
            change.call(unwrapLink);
        }

        change.call(wrapLink, text);
        return true;
    };

    renderMarkButtons = () =>
        MARK_BUTTONS.map(({ btn: Btn, type }, i) => {
            const isActive = this.hasMark(type);
            return (
                <Btn
                    isActive={isActive}
                    key={type}
                    onMouseDown={(event) => this.onClickMark(event, type)}
                />
            );
        });

    renderBlockButtons = () =>
        BLOCK_BUTTONS.map(({ btn: Btn, type }, i) => {
            let isActive = this.hasBlock(type);

            if (["numbered-list", "bulleted-list"].includes(type)) {
                const { value } = this.state;
                const blocks = value.blocks;
                if (blocks.size > 0) {
                    const parent = value.document.getParent(blocks.first().key);
                    isActive = this.hasBlock("list-item") && parent && parent.type === type;
                } else isActive = false;
            }

            return (
                <Btn
                    isActive={isActive}
                    key={type}
                    onMouseDown={(event) => this.onClickBlock(event, type)}
                />
            );
        });

    renderInlineButtons = () =>
        INLINE_BUTTONS.map(({ btn: Btn, type }) => {
            const isActive = this.hasInline(type);

            const onMouseDown =
                type === INLINE_TYPES.LINK ? (e) => this.onClickLink(e, type) : null;

            return <Btn isActive={isActive} onMouseDown={onMouseDown} key={type} />;
        });

    renderEditor = (placeholder) => {
        const { value } = this.state;
        return (
            <Editor
                className="col-xs"
                value={value}
                placeholder={placeholder}
                plugins={plugins}
                onChange={this.onChange}
                renderMark={this.renderMark}
                renderNode={this.renderNode}
            />
        );
    };

    render() {
        const { placeholder } = this.props;

        return (
            <React.Fragment>
                <div className="row scribo-editor-toolbar">
                    {this.renderMarkButtons()}
                    {this.renderInlineButtons()}
                    {this.renderBlockButtons()}
                </div>
                <div className="row scribo-editor-content">{this.renderEditor(placeholder)}</div>
            </React.Fragment>
        );
    }
}
