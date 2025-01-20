import React from "react";
import { useRoutes } from "react-router-dom";
import LoginScreen from "./screens/Login/LoginScreen";
import MenuScreen from "./screens/Menu/MenuScreen";
import PedidoFormScreen from "./screens/Pedido/PedidoFormScreen";

function App() {
  const routes = useRoutes([
    { path: "/", element: <LoginScreen /> },
    { path: "/menu", element: <MenuScreen /> },
    { path: "/pedido", element: <PedidoFormScreen /> },
  ]);

  return routes;
}

export default App;
