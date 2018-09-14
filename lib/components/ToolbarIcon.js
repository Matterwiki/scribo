import React from "react";

export default function ToolbarIcon({ icon: Icon, ...props }) {
    return <Icon width={30} height={30} {...props} />;
}
