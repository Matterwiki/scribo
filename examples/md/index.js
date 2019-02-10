import React from "react";
import { render } from "react-dom";

import { MarkdownEditor } from "../../lib/index";
import "./index.css";

import { emptyValue, randomValue } from "./sample";

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

const Loading = ({ alt }) => <div>Uploading {alt}...</div>;
const Error = ({ alt }) => <div>Error uploading {alt}...</div>;

class MdEditorExample extends React.Component {
    state = {
        readOnly: false,
        showPrintSink: false,
        value: randomValue
    };

    toggleReadOnly = () => {
        this.setState((prevState) => ({
            readOnly: !prevState.readOnly
        }));
    };

    printScriboState = () => {
        this.setState({
            showPrintSink: true
        });
    };

    handleValueChanged = (value) => {
        this.setState({ value });
    };

    render() {
        const imageUploadOptions = {
            Loading,
            Error,
            uploadFileHandler
        };

        const { value, showPrintSink } = this.state;

        return (
            <React.Fragment>
                <h2>
                    <code>MarkdownEditor</code> component
                </h2>
                <div className="container">
                    <MarkdownEditor
                        readOnly={this.state.readOnly}
                        value={value}
                        onValueChanged={this.handleValueChanged}
                        placeholder="Start typing..."
                        imageUploadOptions={imageUploadOptions}
                    />
                </div>
                <div>
                    <input
                        type="button"
                        value="Toggle `readOnly` mode"
                        onClick={this.toggleReadOnly}
                    />
                    <input type="button" value="Print value" onClick={this.printScriboState} />
                </div>
                {showPrintSink && (
                    <div>
                        <pre>
                            <code>{JSON.stringify(value.toJSON(), null, 2)}</code>
                        </pre>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

render(<MdEditorExample />, document.getElementById("root"));

// // TODO Make HMR work!
// if (module.hot) {
//     module.hot.dispose(() => {
//         window.location.reload();
//     });
// }
