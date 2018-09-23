import React from "react";
import styled from "styled-components";

import { FaUnlink, FaExternalLinkAlt } from "react-icons/fa";
import { isKeyHotkey } from "is-hotkey";

import ToolbarPopoverButton from "../../components/ToolbarPopoverButton";

const StyledManageLinkContainer = styled.div`
    display: flex;
    align-items: center;
    height: 32px;
    padding: 4px 8px;
`;

const StyledLinkInput = styled.input`
    box-sizing: content-box;
    background-color: transparent;
    color: #505f79;
    line-height: 20px;
    border-width: 0px;
    border-radius: 0px;
    padding: 0px;
    height: 28px;
    min-width: 244px;
    margin-right: 2px;
    outline: 0;
`;

export default class ManageLinkPopup extends React.Component {
    state = { value: this.props.url };

    onChange = (e) => {
        this.setState({ value: e.target.value });
    };

    saveLink = (e) => {
        if (!isKeyHotkey("enter", e)) return;

        const { value } = this.state;
        if (!value) return;

        this.props.onLinkObtained(value);
        this.setState({ value: "" });
    };

    openLink = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const { value } = this.state;
        window.open(value.indexOf("http") === -1 ? `http://${value}` : value);

        return false;
    };

    removeLink = (e) => {
        e.preventDefault();
        this.props.onLinkRemoved();
        this.setState({ value: "" });
    };

    render() {
        const urlExists = !!this.props.url;
        const { value } = this.state;

        return (
            <StyledManageLinkContainer>
                <StyledLinkInput
                    autoFocus
                    type="text"
                    placeholder="Paste link"
                    value={value}
                    onChange={this.onChange}
                    onKeyPress={this.saveLink}
                />{" "}
                {urlExists && (
                    <ToolbarPopoverButton icon={FaExternalLinkAlt} onClick={this.openLink} />
                )}
                {urlExists && <ToolbarPopoverButton icon={FaUnlink} onClick={this.removeLink} />}
            </StyledManageLinkContainer>
        );
    }
}
