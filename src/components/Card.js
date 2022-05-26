import React from "react";
import Title from "./Title";

const Card = ({ children, title }) => {
  return (
    <div className="card">
      <Title text={title} />
      {children}
    </div>
  );
};

export default Card;
