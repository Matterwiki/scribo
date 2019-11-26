import { Value } from 'slate';

import MdSerializer from './serializers/mdSerializer';
import PlainSerializer from './serializers/plainSerializer';

const md = new MdSerializer();
const plain = new PlainSerializer();

/**
 * Converts saved JSON to editorState that works with the MdEditor
 *
 * TODO This is a three step process for now, which would be replaced by our own serializer later.
 *
 * @param {*} scriboJSON
 */
export function fromJSON (scriboJSON) {
  // Convert the passed in JSON to a slate compatible "value"
  const slateValue = Value.fromJSON(scriboJSON);

  if (!Value.isValue(slateValue)) { throw new Error('Passed in JSON is not valid'); }

  // Convert slate Value to plain md text
  const mdText = md.serialize(slateValue);

  // Convert md text to editor state
  const mdEditorState = plain.deserialize(mdText);

  return mdEditorState;
}

/**
 * Converts editorState to JSON that could be saved on user land side
 *
 * @param {*} mdEditorState
 */
export function toJSON (mdEditorState) {
  // Convert editor state to md plain text
  const mdText = plain.serialize(mdEditorState);

  // Convert mdText to a slate compatible value
  const slateValue = md.deserialize(mdText);

  // convert to json that can be in user land
  const scriboJSON = slateValue.toJSON();

  return scriboJSON;
}
