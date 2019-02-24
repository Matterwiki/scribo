import { getEventTransfer } from "slate-react";
import DeepTablePlugin from "slate-deep-table";

import SanitizePaste from "./utils/sanitizePaste";
import When from "./utils/when";

import { NODE_TYPES } from "../../../common/constants";

export default function TablePlugins() {
    return [
        DeepTablePlugin({
            typeTable: NODE_TYPES.TABLE,
            typeRow: NODE_TYPES.TABLE_ROW,
            typeCell: NODE_TYPES.TABLE_CELL
        }),
        When({
            when: (editor) => editor.isSelectionInTable(),
            plugin: SanitizePaste()
        })
    ];
}
