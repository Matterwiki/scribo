import React from "react";

import ParagraphNode from "./ParagraphNode";
import { NODE_TYPES } from "../../constants";
import RenderNodePlugin from "../renderNode";

const BLOCK_TYPE = NODE_TYPES.PARAGRAPH;

export default function ParagraphPlugins(options) {
    return [RenderNodePlugin({ node: ParagraphNode, nodeType: BLOCK_TYPE })];
}
