/**
 * Adapted from https://github.com/ianstormtaylor/slate-plugins/tree/master/packages/slate-when
 *
 * This plugin changes certain things to get it working with the current version of slate.
 */

const PLUGIN_HANDLERS = [
  'onBeforeInput',
  'onBlur',
  'onCopy',
  'onCut',
  'onDrop',
  'onInput',
  'onKeyDown',
  'onKeyUp',
  'onPaste',
  'onSelect'
];

/**
 * A Slate plugin that wraps another `plugin` to make it only trigger when a
 * `when` function returns true.
 *
 * @param {Object} options
 * @return {Object}
 */

function SlateWhen (options = {}) {
  const { when, plugin } = options;
  if (!when) throw new Error('You must provide a `when` option.');
  if (!plugin) throw new Error('You must provide a `plugin` option.');

  const wrapped = {};

  PLUGIN_HANDLERS.forEach(handler => {
    if (plugin[handler]) {
      wrapped[handler] = (event, editor, next) => {
        if (!when(editor)) return next();
        return plugin[handler](event, editor, next);
      };
    }
  });

  return wrapped;
}

export default SlateWhen;
