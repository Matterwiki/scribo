import React from "react";

import Bold from "quill-icons/lib/icons/bold";
import Italic from "quill-icons/lib/icons/italic";
import Underline from "quill-icons/lib/icons/underline";
import Strike from "quill-icons/lib/icons/strike";
import Link from "quill-icons/lib/icons/link";
import Code from "quill-icons/lib/icons/code";
import Blockquote from "quill-icons/lib/icons/blockquote";
import Header from "quill-icons/lib/icons/header";
import Header2 from "quill-icons/lib/icons/header-2";
import Header3 from "quill-icons/lib/icons/header-3";
import Header4 from "quill-icons/lib/icons/header-4";
import ListBullet from "quill-icons/lib/icons/list-bullet";
import ListOrdered from "quill-icons/lib/icons/list-ordered";
import CodeBlock from "quill-icons/lib/icons/code-block";
import Emoji from "quill-icons/lib/icons/emoji";
import Image from "quill-icons/lib/icons/image";
import Table from "quill-icons/lib/icons/table";

/**
 * Wrapper component that returns a Btn component.
 * This is a named function because we do not want `Unknown` components.
 *
 * @param {any} BtnIcon
 * @returns
 */
function btnWrapper(BtnIcon) {
    return function Btn({ isActive, ...otherProps }) {
        const classNames = `col-xs-2 col-sm-1 col-md-1 col-lg scribo-toolbar-button ${
            isActive ? "active" : ""
        }`;

        return (
            <button type="button" className={classNames} {...otherProps}>
                <BtnIcon width={30} height={30} />
            </button>
        );
    };
}

/**
 * All the buttons, exported
 */
export const BoldButton = btnWrapper(Bold);
export const ItalicButton = btnWrapper(Italic);
export const UnderlineButton = btnWrapper(Underline);
export const StrikeButton = btnWrapper(Strike);
export const LinkButton = btnWrapper(Link);
export const CodeButton = btnWrapper(Code);
export const BlockQuoteButton = btnWrapper(Blockquote);
export const HeaderButton = btnWrapper(Header);
export const Header2Button = btnWrapper(Header2);
export const Header3Button = btnWrapper(Header3);
export const Header4Button = btnWrapper(Header4);
export const ListBulletButton = btnWrapper(ListBullet);
export const ListOrderedButton = btnWrapper(ListOrdered);
export const CodeBlockButton = btnWrapper(CodeBlock);
export const ImageBlockButton = btnWrapper(Image);
export const TableBlockButton = btnWrapper(Table);
export const EmojiButton = btnWrapper(Emoji);

/**
 * Map of mark buttons
 */
export const MARK_BUTTONS = [
    { type: "bold", btn: BoldButton },
    { type: "italic", btn: ItalicButton },
    { type: "underlined", btn: UnderlineButton },
    { type: "strikethrough", btn: StrikeButton },
    { type: "code", btn: CodeButton },
    { type: "emoji", btn: EmojiButton }
];

/**
 * Map of block buttons
 */
export const BLOCK_BUTTONS = [
    { type: "block-quote", btn: BlockQuoteButton },
    { type: "heading-one", btn: HeaderButton },
    { type: "heading-two", btn: Header2Button },
    { type: "heading-three", btn: Header3Button },
    { type: "numbered-list", btn: ListOrderedButton },
    { type: "bulleted-list", btn: ListBulletButton },
    { type: "code", btn: CodeBlockButton },
    { type: "image", btn: ImageBlockButton },
    { type: "table", btn: TableBlockButton }
];
