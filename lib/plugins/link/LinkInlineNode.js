import React from "react";

export default class LinkInlineNode extends React.Component {
    render() {
        const { attributes, node, children } = this.props;
        const { data } = node;

        const href = data.get("href");

        // TODO Ctrl + click should open url
        return (
            <a {...attributes} href={href} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }
}
