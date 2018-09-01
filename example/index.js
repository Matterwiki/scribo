import React from "react";
import { render } from "react-dom";

import Editor from "../lib/index";

import "../lib/css/editor.scss";
import "./index.css";

const RichTextEditorExample = () => (
    <div className="container">
        <Editor placeholder="Start typing..." />
    </div>
);

render(<RichTextEditorExample />, document.getElementById("root"));

// TODO Make HMR work!
if (module.hot) {
    module.hot.dispose(() => {
        window.location.reload();
    });
}
