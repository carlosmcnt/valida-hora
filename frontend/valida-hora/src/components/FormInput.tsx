import React from "react";

export interface FormInputProps {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const styles = {
    height: 56,
    backgroundColor: "#F5F5F5",
    borderRadius: 100,
    border: "none",
    padding: 16,
    width: "100%",
}

export const FormInput = ({ type, name, value, placeholder, onChange }) => {
  return (
    <div style={{width: "100%"}}>
      {/* <label htmlFor={name}>{label}</label> */}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={styles}
      />
    </div>
  );
}