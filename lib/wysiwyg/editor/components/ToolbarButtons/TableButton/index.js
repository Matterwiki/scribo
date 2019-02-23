import React from "react";
import isBoolean from "lodash.isboolean";
import { FaTable } from "react-icons/fa";

import ToolbarButton from "../../../../../common/components/ToolbarButton";
import ToolbarPopover from "../../ToolbarPopover";

import ManageTablePopover from "./ManageTablePopover";

export default class TableToolbarButton extends React.Component {
    state = { popupVisible: false };

    togglePopupVisibility = (override) => {
        this.setState((prevState) => ({
            popupVisible: isBoolean(override) ? override : !prevState.popupVisible
        }));
    };

    handleDimensionsSelected = (columns = 2, rows = 1) => {
        this.togglePopupVisibility();
        const { editor } = this.props;

        editor.insertTable(columns, rows);
    };

    handleAddRow = () => {
        this.togglePopupVisibility();
        const { editor } = this.props;

        editor.insertRow();
    };

    handleRemoveRow = () => {
        this.togglePopupVisibility();
        const { editor } = this.props;

        editor.removeRow();
    };

    handleAddColumn = () => {
        this.togglePopupVisibility();
        const { editor } = this.props;

        editor.insertColumn();
    };

    handleRemoveColumn = () => {
        this.togglePopupVisibility();
        const { editor } = this.props;

        editor.removeColumn();
    };

    handleDeleteTable = () => {
        this.togglePopupVisibility();
        const { editor } = this.props;

        editor.removeTable();
    };

    render() {
        const { value, onChange, editor, ...rest } = this.props;
        const { popupVisible } = this.state;

        const isSelectionInTable = editor.isSelectionInTable();

        return (
            <ToolbarPopover
                visible={popupVisible}
                onClickOutside={() => this.togglePopupVisibility(false)}
                content={
                    <ManageTablePopover
                        isSelectionInTable={isSelectionInTable}
                        onDimensionsObtained={this.handleDimensionsSelected}
                        onAddRowClicked={this.handleAddRow}
                        onRemoveRowClicked={this.handleRemoveRow}
                        onAddColumnClicked={this.handleAddColumn}
                        onRemoveColumnClicked={this.handleRemoveColumn}
                        onDeleteTableClicked={this.handleDeleteTable}
                    />
                }>
                <ToolbarButton
                    icon={FaTable}
                    onClick={this.togglePopupVisibility}
                    active={isSelectionInTable}
                    {...rest}
                />
            </ToolbarPopover>
        );
    }
}
