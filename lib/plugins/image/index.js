import React from "react";
import { FaImage } from "react-icons/fa";

import { hasBlock, addOrRemoveBlock } from "../../changeUtils";
import ToolbarButton from "../../components/ToolbarButton";
import { NODE_TYPES } from "../../constants";

const BLOCK_TYPE = NODE_TYPES.IMAGE;

export function ImageBlockButton({ value, onChange, ...props }) {
    return <ToolbarButton active={hasBlock(value, BLOCK_TYPE)} icon={FaImage} {...props} />;
}
