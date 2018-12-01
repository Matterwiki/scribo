import React from "react";
import { render } from "react-dom";

import Editor from "../lib/index";
import "./index.css";

function uploadFileHandler(file) {
    console.log("selected file:", file);

    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.addEventListener("error", (e) => reject(e), false);
        reader.addEventListener("load", () => resolve(reader.result), false);

        // Timeout to simulate delay
        setTimeout(() => {
            if (file) reader.readAsDataURL(file);
        }, 1000);
    });
}

const Loading = () => <div>Loading...</div>;

const RichTextEditorExample = () => (
    <div className="container">
        <Editor
            placeholder="Start typing..."
            uploadFileHandler={uploadFileHandler}
            uploadLoadingComponent={Loading}
        />
    </div>
);

render(<RichTextEditorExample />, document.getElementById("root"));

// // TODO Make HMR work!
// if (module.hot) {
//     module.hot.dispose(() => {
//         window.location.reload();
//     });
// }
