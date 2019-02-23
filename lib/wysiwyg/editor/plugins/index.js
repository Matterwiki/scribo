import EditorCommandsPlugin from "./commands";
import EditorQueriesPlugin from "./queries";

import MarkPlugins from "./mark";
import BlockPlugins from "./block";
import ImagePlugins from "./image";
import TablePlugins from "./table";

export default [
    // utility plugins
    EditorCommandsPlugin(),
    EditorQueriesPlugin(),

    // feature plugins
    ...MarkPlugins(),
    ...BlockPlugins(),
    ...ImagePlugins(),
    ...TablePlugins()
];
