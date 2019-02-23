import React from "react";
import styled from "styled-components";

import TableDimensionsArea from "./TableDimensions";
import TableOperationsArea from "./TableOperations";

const StyledManageTableContainer = styled.div`
    padding: 4px 8px;
`;

export default function ManageTablePopover({
    isSelectionInTable,
    onDimensionsObtained,
    ...tableOperationsProps
}) {
    return (
        <StyledManageTableContainer>
            {!isSelectionInTable && (
                <TableDimensionsArea onDimensionsObtained={onDimensionsObtained} />
            )}
            {isSelectionInTable && <TableOperationsArea {...tableOperationsProps} />}
        </StyledManageTableContainer>
    );
}
