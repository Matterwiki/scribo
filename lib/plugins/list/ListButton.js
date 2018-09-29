import React from "react";

import { FaListOl, FaListUl } from "react-icons/fa";

import { hasList, addOrRemoveList } from "../../changeUtils";

import ToolbarButton from "../../components/ToolbarButton";
import { NODE_TYPES } from "../../constants";

export function NumberedListButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasList(value, NODE_TYPES.NUMBERED_LIST)}
            icon={FaListOl}
            onClick={(e) => onChange(addOrRemoveList(value, NODE_TYPES.NUMBERED_LIST))}
            {...props}
        />
    );
}

export function BullettedListButton({ value, onChange, ...props }) {
    return (
        <ToolbarButton
            active={hasList(value, NODE_TYPES.BULLETTED_LIST)}
            icon={FaListUl}
            onClick={(e) => onChange(addOrRemoveList(value, NODE_TYPES.BULLETTED_LIST))}
            {...props}
        />
    );
}
