import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import flightsSlice from "./flightsSlice";

export const store = configureStore({
  reducer: {
    flights: flightsSlice,
  },
});

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
