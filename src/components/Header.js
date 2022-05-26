import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { AppRoutes } from "../routes";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const { signOut, currentUser } = useAuth();

  return (
    <div className="header">
      <h1>LOGO</h1>

      {currentUser && (
        <>
          <div className="links-container">
            {AppRoutes.map((r, i) => {
              if (r.hideInMenu) {
                return "";
              } else {
                return (
                  <Link className="link" key={i} to={r.url}>
                    {r.title}
                  </Link>
                );
              }
            })}
          </div>

          <Button
            text="Sign Out"
            onClick={async () => {
              await signOut();
              navigate("/login");
            }}
          />
        </>
      )}
    </div>
  );
};

export default Header;
