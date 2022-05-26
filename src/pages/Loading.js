import React, { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  });
  return <div className="loading-page">Loading</div>;
};

export default Loading;
