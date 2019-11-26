import { Value } from 'slate';

/**
 * Wrapper method that converts saved JSON to a slate value.
 *
 * This enables us to expose a uniform API for user land consumption
 *
 * @param {*} scriboJSON
 */
export function fromJSON (scriboJSON) {
  return Value.fromJSON(scriboJSON);
}

/**
 * Wrapper method that converts editor state to JSON that could be saved in user land.
 *
 * This enables us to expose a uniform API for user land consumption.
 *
 * @param {*} scriboJSON
 */
export function toJSON (wysiwygEditorState) {
  return wysiwygEditorState.toJSON();
}
