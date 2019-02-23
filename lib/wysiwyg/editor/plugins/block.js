import SoftBreak from "./utils/softBreak";
import ClearListFormattingPlugin from "./utils/clearListFormatting";
import ClearBlockFormattingPlugin from "./utils/clearBlockFormatting";
import AdjustListDepthPlugin from "./utils/adjustListDepth";

import { NODE_TYPES } from "../../../common/constants";

export default function BlockPlugins(options) {
    return [
        ClearBlockFormattingPlugin({
            keyName: "backspace",
            exitCondition: (value) => value.document.text !== ""
        }),
        SoftBreak({ blockType: NODE_TYPES.BLOCK_QUOTE }),
        SoftBreak({ blockType: NODE_TYPES.CODE_BLOCK }),
        ClearListFormattingPlugin(),
        AdjustListDepthPlugin()
    ];
}
