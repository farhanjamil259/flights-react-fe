import React, { useState } from "react";

const Checkbox = ({ onChange, label }) => {
  const [value, setValue] = useState(true);

  return (
    <div
      className="checkbox"
      onClick={() => {
        setValue(!value);
        onChange(!value);
      }}
    >
      <div className={`box ${value ? "box--active" : ""}`}>
        {value && <TickIcon />}
      </div>
      <p>{label}</p>
    </div>
  );
};

const TickIcon = () => {
  return (
    <svg
      aria-hidden="true"
      role="img"
      id="footer-sample-full"
      width="24"
      height="24"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093l3.473-4.425a.267.267 0 0 1 .02-.022z"
      ></path>
    </svg>
  );
};

export default Checkbox;
