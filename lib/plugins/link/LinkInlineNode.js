import React from "react";

export default class LinkInlineNode extends React.Component {
    render() {
        const { attributes, href, children } = this.props;

        // TODO Ctrl + click should open url
        return (
            <a {...attributes} href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }
}
