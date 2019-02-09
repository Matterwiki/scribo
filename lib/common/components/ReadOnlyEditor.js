import React from "react";

import Editor from "./Editor";
import { renderMark, renderNode } from "../renderers";

export default function ReadOnlyEditor({ value }) {
    return <Editor value={value} renderMark={renderMark} renderNode={renderNode} readOnly />;
}
