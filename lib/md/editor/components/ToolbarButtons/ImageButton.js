import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";

import ToolbarButton from "../../../../common/components/ToolbarButton";
import { NODE_TYPES } from "../../../../common/constants";

const HiddenFileInput = styled.input`
    display: none;
`;

export default class ImageBlockButton extends React.Component {
    handleClick = () => {
        // Get the node input
        const uploadInput = ReactDOM.findDOMNode(this.uploadInput);

        // Reset the thing if there's something else
        uploadInput.value = "";

        // "Trigger" the upload click
        uploadInput.click();
    };

    handleFileUpload = (e) => {
        if (!e.target.files.length) return;

        const file = e.target.files[0];
        const { editor } = this.props;

        editor.insertBlock({ type: NODE_TYPES.IMAGE, data: { file, alt: file.name } });
    };

    render() {
        const { value, onChange, ...props } = this.props;
        return (
            <React.Fragment>
                <HiddenFileInput
                    ref={(input) => (this.uploadInput = input)}
                    onChange={this.handleFileUpload}
                    type="file"
                />
                <ToolbarButton icon={FaImage} onClick={this.handleClick} {...props} />
            </React.Fragment>
        );
    }
}
