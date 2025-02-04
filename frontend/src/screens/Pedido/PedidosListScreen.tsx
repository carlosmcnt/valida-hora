import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { style } from "../../styles/headerStyles";
import botao from "../../assets/voltar.svg";
import { useNavigate } from "react-router-dom";
import { cursos } from "./Pedido-utils";

const PedidosListScreen = () => {
  const [pedidos, setPedidos] = useState([]);
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
  const userId = usuarioSalvo.usuario.id_usuario;
  const navigate = useNavigate();

  const fetchPedidos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/consultas/todos/usuario/${userId}`
      );
      setPedidos(response.data);
    } catch (error) {
      alert("Erro ao buscar pedidos.");
      console.error(error);
    }
  };

  const handleExportTXT = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/exportacao/download/${id}`,
        { responseType: "blob" }
      );
  
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `pedidos_${id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Erro ao exportar o arquivo.");
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "16px",
        background: "#ECF0F3",
      }}
    >
      <HeaderPage style={style} />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <button
          type="button"
          style={{ border: "none" }}
          onClick={() => navigate("/menu")}
        >
          <img
            src={botao}
            alt="Logo"
            style={{ width: "30px", marginBottom: 16 }}
          />
        </button>
        <h2
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}
        >
          Total de Pedidos: <span>{pedidos.length}</span>
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <div
              key={pedido.id_pedido}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                background: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Coluna 1: ID e Descrição */}
              <div style={{ flex: 2 }}>
                <strong style={{ fontSize: "16px" }}>
                  Pedido {pedido.id_pedido}
                </strong>
                <p
                  style={{ fontSize: "14px", color: "#555", margin: "4px 0 0" }}
                >
                  {pedido.descricao}
                </p>
              </div>

              {/* Coluna 2: Status */}
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: pedido.status === "aprovado" ? "green" : "",
                }}
              >
                {pedido.status || "Pedido PENDENTE"}
              </div>

              {pedido.status === "aprovado" ? (
                <div>
                  <button
                    onClick={() => handleExportTXT(pedido.id_pedido)}
                    style={{
                      background: "#BCC4D1",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    EXPORTAR
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    style={{
                      background: "#BCC4D1",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                    onClick={() => navigate(`/pedido/${pedido.id_pedido}`)}
                  >
                    AVALIAR
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Nenhum pedido encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default PedidosListScreen;
