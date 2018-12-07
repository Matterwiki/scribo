import { getEventTransfer } from "slate-react";
import DeepTablePlugin from "slate-deep-table";

import RenderNodePlugin from "../renderNode";
import { Table, TableCell, TableRow } from "./components";

import { NODE_TYPES } from "../../constants";

export { default as TableToolbarButton } from "./TableToolbarButton";

export function TablePlugins() {
    return [
        RenderNodePlugin({
            nodeType: NODE_TYPES.TABLE,
            node: Table
        }),
        RenderNodePlugin({
            nodeType: NODE_TYPES.TABLE_ROW,
            node: TableRow
        }),
        RenderNodePlugin({
            nodeType: NODE_TYPES.TABLE_CELL,
            node: TableCell
        }),
        DeepTablePlugin({
            typeTable: NODE_TYPES.TABLE,
            typeRow: NODE_TYPES.TABLE_ROW,
            typeCell: NODE_TYPES.TABLE_CELL
        }),
        {
            /**
             * Remove fanciness from the default onPaste behaviour
             *
             * @param {*} event
             * @param {*} editor
             * @param {*} next
             */
            onPaste(event, editor, next) {
                if (!editor.isSelectionInTable()) return next();

                const { text } = getEventTransfer(event);
                editor.insertText(text);
            }
        }
    ];
}
