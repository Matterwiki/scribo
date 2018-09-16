import { generateClearFormattingKeyDownEvent } from "../utils";

export default function ClearBlockFormattingPlugin(options) {
    return {
        onKeyDown: generateClearFormattingKeyDownEvent()
    };
}
