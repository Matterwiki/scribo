import MarkKeyBoardShortCutPlugin from "./utils/markKeyboardShortcut";
import ClearMarkFormattingPlugin from "./utils/clearMarkFormatting";

import { NODE_TYPES } from "../../common/constants";

export default function MarkPlugins(options) {
    return [
        ClearMarkFormattingPlugin({ keyName: "enter" }),
        MarkKeyBoardShortCutPlugin({ keyCombination: "mod+b", type: NODE_TYPES.BOLD }),
        MarkKeyBoardShortCutPlugin({ keyCombination: "mod+i", type: NODE_TYPES.ITALIC }),
        MarkKeyBoardShortCutPlugin({ keyCombination: "mod+u", type: NODE_TYPES.UNDERLINED }),
        MarkKeyBoardShortCutPlugin({ keyCombination: "mod+d", type: NODE_TYPES.STRIKETHROUGH }),
        MarkKeyBoardShortCutPlugin({ keyCombination: "mod+alt+c", type: NODE_TYPES.CODE })
        // TODO Add schema normalization that adds extra text node after codeFence
        // TODO Rename to codeFence
    ];
}
