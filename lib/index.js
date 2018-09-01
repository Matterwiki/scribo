import React from "react";
import { Editor, getEventTransfer } from "slate-react";
import { Value } from "slate";
import isUrl from "is-url";

import { MARK_BUTTONS, BLOCK_BUTTONS, LinkButton } from "./toolbarButtons";

import "flexboxgrid/css/flexboxgrid.css";

// TODO Is this is the right way to setup an empty editor value??
const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: "block",
                type: "paragraph",
                nodes: []
            }
        ]
    }
});

const DEFAULT_NODE = "paragraph";

const StrikeThrough = ({ children, ...props }) => (
    <span className="strikethrough-mark" {...props}>
        {children}
    </span>
);

function wrapLink(change, href) {
    change.wrapInline({
        type: "link",
        data: { href }
    });

    change.moveToEnd();
}

function unwrapLink(change) {
    change.unwrapInline("link");
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

    hasLinks = () => {
        const { value } = this.state;
        return value.inlines.some((inline) => inline.type === "link");
    };

    renderMark = (props) => {
        const { children, mark, attributes } = props;

        switch (mark.type) {
            case "bold":
                return <strong {...attributes}>{children}</strong>;
            case "code":
                return <code {...attributes}>{children}</code>;
            case "italic":
                return <em {...attributes}>{children}</em>;
            case "underlined":
                return <u {...attributes}>{children}</u>;
            case "strikethrough":
                return <StrikeThrough {...attributes}>{children}</StrikeThrough>;
            default:
                return <span {...attributes}>{children}</span>;
        }
    };

    renderLink = ({ attributes, children, node }) => {
        const { data } = node;
        const href = data.get("href");

        return (
            <a {...attributes} href={href}>
                {children}
            </a>
        );
    };

    renderNode = (props) => {
        const { attributes, children, node } = props;

        switch (node.type) {
            case "block-quote":
                return <blockquote {...attributes}>{children}</blockquote>;
            case "bulleted-list":
                return <ul {...attributes}>{children}</ul>;
            case "heading-one":
                return <h1 {...attributes}>{children}</h1>;
            case "heading-two":
                return <h2 {...attributes}>{children}</h2>;
            case "list-item":
                return <li {...attributes}>{children}</li>;
            case "numbered-list":
                return <ol {...attributes}>{children}</ol>;
            case "link":
                return this.renderLink(props);
            default:
                return <div {...attributes}>{children}</div>;
        }
    };

    onClickLink = (event) => {
        event.preventDefault();

        const { value } = this.state;
        const hasLinks = this.hasLinks();
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

    renderEditor = (placeholder) => {
        const { value } = this.state;
        return (
            <Editor
                className="col-xs"
                value={value}
                placeholder={placeholder}
                onChange={this.onChange}
                renderMark={this.renderMark}
                renderNode={this.renderNode}
            />
        );
    };

    renderLinkButton = () => (
        <LinkButton isActive={this.hasLinks()} onMouseDown={this.onClickLink} key="link" />
    );

    render() {
        const { placeholder } = this.props;

        return (
            <React.Fragment>
                <div className="row scribo-editor-toolbar">
                    {this.renderMarkButtons()}
                    {this.renderLinkButton()}
                    {this.renderBlockButtons()}
                </div>
                <div className="row scribo-editor-content">{this.renderEditor(placeholder)}</div>
            </React.Fragment>
        );
    }
}
