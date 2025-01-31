import React from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { style } from "../../styles/headerStyles";
import { FormButton } from "../../components/FormButton";
import { useNavigate } from "react-router-dom";

const MenuScreen = () => {
  const navigate = useNavigate();
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
  const handleRealizarPedido = () => {
    navigate("/pedido"); // Redireciona para a rota do formulário de pedido
  };

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
      <h2>Olá {usuarioSalvo?.nome}, o que você deseja fazer?</h2>
      <FormButton
        value={"Realizar Pedido"}
        onClick={handleRealizarPedido}
        styles={{ width: 500 }}
      />
      <FormButton
        value={"Histórico de Pedido"}
        styles={{ width: 500 }}
        onClick={() => alert("Em breve!")}
      />
    </div>
  );
};
export default MenuScreen;
