import React from "react";

const buttonStyles = {
    height: 48,
    backgroundColor: "#3E3E3E",
    color: "white",
    fontSize: 16,
    borderRadius: 15,
    border: "none",
    width: 250,

}
export interface FormButtonProps {
    type: string;
    name: string;
    value: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const FormButton = ({ type, name, value, onClick, styles }) => {
    return (
        <button
            type={type}
            id={name}
            name={name}
            value={value}
            onClick={onClick}
            style={{...styles, ...buttonStyles}}
        >
            {value}
        </button>
    );
}