import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";

import { StoreProvider } from "./redux/store";

import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer theme="light" />
  </StoreProvider>
);
