import React from "react";

export default ({ attributes, href, children }) => {
    return (
        <a {...attributes} href={href}>
            {children}
        </a>
    );
};
