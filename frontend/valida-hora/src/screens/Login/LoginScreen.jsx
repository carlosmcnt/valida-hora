import React, { useState } from "react";
import { FormInput } from "../../components/FormInput";
import { FormButton } from "../../components/FormButton";
import UsuarioService from "../../services/UsuarioService";
import { useNavigate } from "react-router-dom";
import { HeaderPage } from "../../components/HeaderPage";
import { style } from "../../styles/headerStyles";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      // const usuario = await UsuarioService.login(email, password);
      // console.log("Usuário logado:", usuario);
      // Redirecionar
      navigate("/menu");
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert(error.message || "Erro ao fazer login");
    }
  };

  return (
    <div
      style={{
        alignItems: "center",
        width: 900,
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
        marginTop: 100,
      }}
    >
      <HeaderPage style={style} />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: 16,
          gap: 16,
          width: "100%",
        }}
      >
        <h2 style={{ alignSelf: "start" }}>Faça seu Login</h2>
        <FormInput
          type="email"
          id="email"
          name="email"
          placeholder="Digite o email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          id="password"
          name="password"
          placeholder="Digite a senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton type="submit" value="Acessar" />
      </form>
      <h5>Ainda não possui conta? Cadastre-se</h5>
    </div>
  );
}

export default LoginScreen;
