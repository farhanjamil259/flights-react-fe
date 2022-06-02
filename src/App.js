import React from "react";

import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Missing from "./pages/Missing";

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

        <Route path="*" element={<Missing />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
