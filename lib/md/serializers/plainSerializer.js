import Plain from "slate-plain-serializer";
import { Value } from "slate";

import { NODE_TYPES } from "../../common/constants";

const IMG_MD_REGEX = /(?:!\[(.*?)\]\((.*?)\))/gm;
const IMG_MD_ALT_REGEX = /(\((.*?)\))/gm;
const IMG_MD_SRC_REGEX = /(?:!\[(.*?)\])/gm;

/**
 * Overrides the plain serializer and adds custom stuff that this editor needs
 *
 * TODO This may not be the best way to do this, so refactoring this serializer mess is impending
 *
 * @export
 * @class PlainSerializer
 */
export default class PlainSerializer {
    /**
     * Performs custom transformations to slate state before calling the original serializer.
     *
     * @param {*} state
     * @returns
     * @memberof PlainSerializer
     */
    serialize(state) {
        const editorState = state.toJSON();

        editorState.document.nodes.forEach((n) => {
            if (n.type !== NODE_TYPES.IMAGE) return;

            // Match found, do transformations
            const { alt, src } = n.data;

            // Switch to "line" type, so slate-plain-serializer will understand this
            n.type = "line";
            n.nodes = [
                {
                    leaves: [{ marks: [], object: "leaf", text: `![${alt}](${src})` }],
                    object: "text"
                }
            ];
        });

        return Plain.serialize(Value.fromJSON(editorState));
    }

    /**
     * Performs custom transformations to state deserialized with the original serializer
     *
     * @param {*} plain
     * @returns
     * @memberof PlainSerializer
     */
    deserialize(plain) {
        const editorValue = Plain.deserialize(plain).toJSON();

        const { document } = editorValue;

        document.nodes.forEach((n) => {
            const { nodes } = n;

            if (!nodes.length > 0) return;
            const [firstNode] = nodes;

            if (!firstNode.leaves || firstNode.leaves.length === 0) return;
            const [firstLeaf] = firstNode.leaves;

            if (!firstLeaf.text) return;
            if (!firstLeaf.text.match(IMG_MD_REGEX)) return;

            // match found, do transformations

            // Switch to "image" type, so scribo will understand this
            const alt = firstLeaf.text
                .replace(IMG_MD_ALT_REGEX, "")
                .replace("![", "")
                .replace("]", "");
            const src = firstLeaf.text
                .replace(IMG_MD_SRC_REGEX, "")
                .replace("(", "")
                .replace(")", "");

            n.type = NODE_TYPES.IMAGE;
            n.data = { alt, src };
            n.nodes = [
                {
                    leaves: [{ marks: [], object: "leaf", text: "" }],
                    object: "text"
                }
            ];
        });

        return Value.fromJSON(editorValue);
    }
}
