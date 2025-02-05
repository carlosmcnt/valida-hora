import React from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { style } from "../../styles/headerStyles";
import { FormButton } from "../../components/FormButton";
import { useNavigate } from "react-router-dom";

const MenuScreen = () => {
  const navigate = useNavigate();
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
  const handleRealizarPedido = () => {
    navigate("/pedido/criar"); // Redireciona para a rota do formulário de pedido
  };
  const userType = usuarioSalvo.usuario.tipo;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
        marginTop: 64,
      }}
    >
      <HeaderPage style={style} />
      <h2>Olá {usuarioSalvo?.usuario.nome}, o que você deseja fazer?</h2>
      <FormButton
        value={"Realizar Pedido"}
        onClick={handleRealizarPedido}
        styles={{ width: 500 }}
        hideButton={userType === "avaliador"}
      />
      <FormButton
        value={"Histórico de Pedido"}
        styles={{ width: 500 }}
        onClick={() => alert("Em breve!")}
        hideButton={userType === "avaliador"}
      />
      <FormButton
        value={"Consultar Pedidos"}
        styles={{ width: 500 }}
        onClick={() => navigate("/pedido/lista")}
        hideButton={userType === "estudante"}
      />
    </div>
  );
};
export default MenuScreen;
