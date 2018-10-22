import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";

import { hasBlock, insertImage } from "../../changeUtils";
import ToolbarButton from "../../components/ToolbarButton";
import { NODE_TYPES } from "../../constants";

const BLOCK_TYPE = NODE_TYPES.IMAGE;

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
        const { value, onChange } = this.props;

        const change = value.change();

        onChange(change.call(insertImage, { file }));
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
                <ToolbarButton
                    active={hasBlock(value, BLOCK_TYPE)}
                    icon={FaImage}
                    onClick={this.handleClick}
                    {...props}
                />
            </React.Fragment>
        );
    }
}
