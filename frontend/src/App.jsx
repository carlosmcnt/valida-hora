import { useRoutes } from "react-router-dom";
import LoginScreen from "./screens/Login/LoginScreen";
import MenuScreen from "./screens/Menu/MenuScreen";
import PedidoFormScreen from "./screens/Pedido/PedidoFormScreen";
import PedidosListScreen from "./screens/Pedido/PedidosListScreen";
import PedidoDetalhesScreen from "./screens/Pedido/PedidoDetalhesScreen";

function App() {
  const routes = useRoutes([
    { path: "/", element: <LoginScreen /> },
    { path: "/menu", element: <MenuScreen /> },
    { path: "/pedido/criar", element: <PedidoFormScreen /> },
    { path: "/pedido/lista", element: <PedidosListScreen /> },
    { path: "/pedido/:id", element: <PedidoDetalhesScreen /> },
  ]);

  return routes;
}

export default App;
