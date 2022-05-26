import React from "react";

const Button = ({ text, onClick, loading }) => {
  return (
    <button disabled={loading} className="button" onClick={onClick}>
      {loading ? "Loading" : text}
    </button>
  );
};

export default Button;
