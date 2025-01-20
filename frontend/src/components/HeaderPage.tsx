import React from "react";
import logo from "../assets/logo.png";

export const HeaderPage = ({ style }) => (
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
    <img src={logo} alt="Logo" style={{ width: "230px" }} />
  </div>
);
