import React from 'react';
import styled from 'styled-components';
import { isKeyHotkey } from 'is-hotkey';

const StyledDimensionsContainer = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const StyledDimensionInput = styled.input`
  box-sizing: content-box;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #e6e6e6;
  color: #505f79;
  line-height: 20px;
  margin: 10px;
  width: 60px;
  outline: 0;
  text-align: center;
`;

export default class TableDimensions extends React.Component {
  state = { cols: '', rows: '' };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleKeyPress = e => {
    if (!isKeyHotkey('enter', e)) return;

    const { rows, cols } = this.state;
    if (!rows || !cols) return;

    this.props.onDimensionsObtained(cols, rows);
    this.setState({ rows: '', cols: '' });
  };

  render () {
    const { rows, cols } = this.state;

    return (
      <StyledDimensionsContainer>
        <StyledDimensionInput
          autoFocus
          name='rows'
          placeholder='Rows'
          value={rows}
          type='number'
          max={100}
          min={0}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />{' '}
        x{' '}
        <StyledDimensionInput
          name='cols'
          placeholder='Cols'
          value={cols}
          min={0}
          type='number'
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </StyledDimensionsContainer>
    );
  }
}
