import React from "react";
import { render } from "react-dom";

import { WYSIWYGEditor, MarkdownEditor } from "../lib/index";
import "./index.css";

function uploadFileHandler(file) {
    console.log("File to upload:", file);

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("error", (e) => reject(e), false);
        reader.addEventListener("load", () => resolve(reader.result), false);

        // Timeout to simulate delay
        setTimeout(() => {
            if (file) reader.readAsDataURL(file);
        }, 1000);
    });
}

const Loading = () => <div>Uploading...</div>;

const RichTextEditorExample = () => (
    <React.Fragment>
        <h2>
            <code>MarkdownEditor</code> component
        </h2>
        <div className="container">
            <MarkdownEditor
                placeholder="Start typing..."
                uploadFileHandler={uploadFileHandler}
                uploadLoadingComponent={Loading}
            />
        </div>

        <h2>
            <code>WYSIWYGEditor</code> component
        </h2>
        <div className="container">
            <WYSIWYGEditor
                placeholder="Start typing..."
                uploadFileHandler={uploadFileHandler}
                uploadLoadingComponent={Loading}
            />
        </div>
    </React.Fragment>
);

render(<RichTextEditorExample />, document.getElementById("root"));

// // TODO Make HMR work!
// if (module.hot) {
//     module.hot.dispose(() => {
//         window.location.reload();
//     });
// }
