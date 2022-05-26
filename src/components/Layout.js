import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
