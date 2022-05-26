import React from "react";

const Input = ({ value, onChange, label, type, required }) => {
  return (
    <label className="input">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="field"
      />
    </label>
  );
};

export default Input;
