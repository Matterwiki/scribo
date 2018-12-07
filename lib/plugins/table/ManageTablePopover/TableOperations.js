import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const StyledOperationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const StyledOperationsButton = styled.button`
    align-self: stretch;
    border-width: 1px;
    border-styled: solid;
    border-radius: 2px;
    margin: 2px;
    background-color: ${(props) => (props.danger ? "#dc3545" : "transparent")};
    color: ${(props) => (props.danger ? "#fff" : "#393e41")};
    border-color: ${(props) => (props.danger ? "#dc3545" : "#e6e6e6")};
    padding: 5px;
    cursor: pointer;

    & > svg {
        float: left;
        margin-right: 4px;
    }
`;

export default function TableOperations({
    onAddRowClicked,
    onRemoveRowClicked,
    onAddColumnClicked,
    onRemoveColumnClicked,
    onDeleteTableClicked
}) {
    return (
        <StyledOperationsContainer>
            <StyledOperationsButton onClick={onAddColumnClicked}>
                <FaPlus size={15} /> Add Column
            </StyledOperationsButton>
            <StyledOperationsButton onClick={onRemoveColumnClicked}>
                <FaMinus size={15} />
                Remove Column
            </StyledOperationsButton>
            <StyledOperationsButton onClick={onAddRowClicked}>
                <FaPlus size={15} />
                Add Row
            </StyledOperationsButton>
            <StyledOperationsButton onClick={onRemoveRowClicked}>
                <FaMinus size={15} />
                Remove Row
            </StyledOperationsButton>
            <StyledOperationsButton onClick={onDeleteTableClicked} danger={true}>
                <FaTrash size={15} />
                Delete Table
            </StyledOperationsButton>
        </StyledOperationsContainer>
    );
}
