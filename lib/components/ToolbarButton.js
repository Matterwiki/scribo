import React from "react";
import styled from "styled-components";

const StyledToolbarButton = styled.button`
    background: transparent;
    border: none;
    box-sizing: content-box;
    color: #393e41;
    cursor: pointer;
    font-size: 8px;
    margin: 0.2em;
    max-width: 20px;

    &:focus {
        outline: 0;
    }

    & .ql-stroke {
        fill: transparent;
        stroke: ${(props) => (props.active ? props.activeColor : props.defaultColor)};
    }

    & .ql-stroke-mitter {
        fill: transparent;
        stroke: ${(props) => (props.active ? props.activeColor : props.defaultColor)};
    }

    & .ql-fill {
        fill: ${(props) => (props.active ? props.activeColor : props.defaultColor)};
    }

    & .ql-even {
        fill: #fff;
        stroke: ${(props) => (props.active ? props.activeColor : props.defaultColor)};
    }

    & .ql-color-label {
        fill: red;
    }

    & .ql-transparent {
        opacity: 0.2;
    }

    & .ql-thin {
        fill: transparent;
        stroke: ${(props) => (props.active ? props.activeColor : props.defaultColor)};
        stroke-width: 0.5;
    }
`;

function ToolbarButton({ children, className, icon: Icon, ...props }) {
    return (
        <StyledToolbarButton className={className} {...props}>
            <Icon width={30} height={30} />
        </StyledToolbarButton>
    );
}

ToolbarButton.defaultProps = {
    activeColor: "#ff0066",
    defaultColor: "#000",
    active: false
};

export default ToolbarButton;
