import Flights from "./pages/Flights";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

export const AppRoutes = [
  {
    title: "Flights",
    url: "/",
    component: <Flights />,
    private: true,
  },
  {
    title: "Settings",
    url: "/settings",
    component: <Settings />,
    private: true,
  },
  {
    title: "Login",
    url: "/login",
    component: <Login />,
    hideInMenu: true,
  },
];
