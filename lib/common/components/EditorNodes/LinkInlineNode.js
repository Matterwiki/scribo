import React from 'react';

export default class LinkInlineNode extends React.Component {
  render () {
    const { children, href } = this.props;

    // TODO Ctrl + click should open url
    return (
      <a href={href} target='_blank' rel='noopener noreferrer'>
        {children}
      </a>
    );
  }
}
