import React from "react";
import { useRoutes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";

function App() {
  const routes = useRoutes([{ path: "/", element: <LoginScreen /> }]);

  return routes;
}

export default App;
