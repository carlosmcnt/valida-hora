import React from "react";
import logo from "../assets/logo.png"; // Importação da imagem
import { FormInput } from "../components/FormInput";
import { FormButton } from "../components/FormButton";

function LoginScreen() {
  const style = {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };
  return (
    <div
      style={{
        alignItems: "center",
        width: 900,
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
        marginTop: 64,
      }}
    >
      <div style={{ marginBottom: 8, ...style }}>
        <div style={{ alignSelf: "end", marginBottom: 16 }}>
          <h1
            style={{
              fontFamily: "cursive",
              fontSize: 48,
            }}
          >
            Valida Hora
          </h1>
        </div>
        <img src={logo} alt="Logo" style={{ width: "300px" }} />
      </div>
      <form
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
          placeholder="Digite  o email"
        />
        <FormInput
          type="password"
          id="password"
          name="password"
          placeholder="Digite a senha"
        />
        <FormButton
          type="submit"
          value={"Acessar"}
          styles={{ marginTop: 16 }}
        />
      </form>
      <h5>Ainda não possui conta? Cadastre-se</h5>
    </div>
  );
}

export default LoginScreen;
