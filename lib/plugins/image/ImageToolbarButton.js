import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";

import { hasBlock, addOrRemoveBlock } from "../../changeUtils";
import ToolbarButton from "../../components/ToolbarButton";
import { NODE_TYPES } from "../../constants";

const BLOCK_TYPE = NODE_TYPES.IMAGE;

const HiddenFileInput = styled.input`
    display: none;
`;

export default class ImageBlockButton extends React.Component {
    handleClick = () => {
        const uploadInput = ReactDOM.findDOMNode(this.uploadInput);
        uploadInput.value = "";
        uploadInput.click();
    };

    handleFileUpload = (e) => {
        // e.target.files[0] is the file we need 🎉
        // TODO Add this to `data` and insert image block
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
