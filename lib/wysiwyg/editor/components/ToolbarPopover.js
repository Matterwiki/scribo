import React from 'react';
import Popover from 'react-tiny-popover';

// TODO Use this via styled components
const containerStyles = {
  'background-color': '#ffffff',
  'box-shadow':
    '0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2), 0 8px 24px rgba(16, 22, 26, 0.2)'
};

export default class ToolbarPopover extends React.Component {
  // TODO Make this a little more responsible to its visibility state
  render () {
    const { children, content, visible, onClickOutside } = this.props;
    return (
      <Popover
        isOpen={visible}
        position='bottom'
        onClickOutside={onClickOutside}
        padding={10}
        containerStyle={containerStyles}
        content={content}
      >
        {children}
      </Popover>
    );
  }
}
