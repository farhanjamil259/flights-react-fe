import React from "react";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import { AppRoutes } from "./routes";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {AppRoutes.map((r, i) => {
            if (r.private) {
              return (
                <Route key={i} path={r.url} element={<PrivateRoute />}>
                  <Route path={r.url} element={r.component} />
                </Route>
              );
            } else {
              return <Route key={i} path={r.url} element={r.component} />;
            }
          })}
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
