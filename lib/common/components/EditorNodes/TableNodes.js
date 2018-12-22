import React from "react";
import styled from "styled-components";

const StyledTableContainer = styled.div`
    overflow: auto;
`;

const StyledTable = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #b4b4b4;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
`;

const StyledTableRow = styled.tr`
    border-bottom: 1px solid #b4b4b4;

    &:nth-child(even) {
        background: #f6f6f6;
    }

    &:nth-child(odd) {
        background: #fff;
    }
`;

const StyledHeader = styled.thead`
    & > tr {
        font-weight: bold;
    }
`;

const StyledTableCell = styled.td`
    border-left: 1px solid #b4b4b4;
    border-width: 0 0 0 1px;
    font-size: inherit;
    margin: 0;
    overflow: visible;
    padding: 0.5em 1em;
    min-width: 100px;
    max-width: 200px;
    &:first-child {
        border-left-width: 0;
    }
`;

/**
 * Splits header from the rest of the rows
 *
 * Ripped off from: https://github.com/jasonphillips/slate-deep-table/blob/master/lib/defaultRenderers.js#L7
 * @param {*} rows
 */
const getTableData = (rows) =>
    !rows || !rows.length || rows.length === 1
        ? { header: null, rows }
        : {
              header: rows[0],
              rows: rows.slice(1)
          };

export function Table({ attributes, children }) {
    const { header, rows } = getTableData(children);

    return (
        <StyledTableContainer>
            <StyledTable>
                {header && <StyledHeader {...attributes}>{header}</StyledHeader>}
                <tbody {...attributes}>{rows}</tbody>
            </StyledTable>
        </StyledTableContainer>
    );
}

export function TableRow({ attributes, children }) {
    return <StyledTableRow {...attributes}>{children}</StyledTableRow>;
}

export function TableCell({ attributes, children }) {
    return <StyledTableCell {...attributes}>{children}</StyledTableCell>;
}
