import React from "react";

export function HeadingOne({ children, attributes }) {
    return <h1 {...attributes}>{children}</h1>;
}
export function HeadingTwo({ children, attributes }) {
    return <h2 {...attributes}>{children}</h2>;
}
export function HeadingThree({ children, attributes }) {
    return <h3 {...attributes}>{children}</h3>;
}
