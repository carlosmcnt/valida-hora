import React from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { FormButton } from "../../components/FormButton";
import { style } from "../../styles/headerStyles";
import { useNavigate } from "react-router-dom";

import barema from "../../assets/barema.svg";

const PedidoFormScreen = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 16,
      }}
    >
      <HeaderPage style={style} />
      <div
        style={{
          width: "900px",
          backgroundColor: "white",
          padding: 32,
          borderRadius: 8,
          boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#000",
          }}
        >
          Novo Pedido
        </h1>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <label>Nome:</label>
              <input
                type="text"
                placeholder="Maria da Silva"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Matrícula:</label>
              <input
                type="text"
                placeholder="202419874"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Curso:</label>
              <input
                type="text"
                placeholder="Ciência da Computação"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
            </div>
          </div>

          <div>
            <label>Descrição:</label>
            <textarea
              placeholder="Digite aqui os detalhes do pedido"
              style={{
                width: "100%",
                padding: "8px",
                height: "80px",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <label>Data Início:</label>
              <input
                type="date"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Data Fim:</label>
              <input
                type="date"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>CH Total:</label>
              <input
                type="text"
                placeholder="50 horas"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>CH Pretendida:</label>
              <input
                type="text"
                placeholder="20 horas"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
            }}
          >
            <div style={{ flex: 1 }}>
              <label>Selecione a categoria:</label>
              <select
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                <option value="">Categoria 1</option>
                <option value="">Categoria 2</option>
                <option value="">Categoria 3</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Selecione a subcategoria:</label>
              <select
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                <option value="">Subcategoria 1</option>
                <option value="">Subcategoria 2</option>
                <option value="">Subcategoria 3</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Selecione o tipo:</label>
              <select
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              >
                <option value="">Tipo 1</option>
                <option value="">Tipo 2</option>
                <option value="">Tipo 3</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <label>Comprovante</label>
            <input
              type="file"
              style={{
                display: "block",
                marginTop: 8,
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            <label>Barema</label>
            <button
              style={{ border: "none", background: "none" }}
              type="button"
            >
              <img src={barema} alt="barema" style={{ width: 25 }} />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 32,
              marginTop: 24,
            }}
          >
            <FormButton
              value={"Finalizar"}
              styles={{
                width: 150,
              }}
              onClick={() => navigate("/menu")}
            />
            <FormButton
              value={"Salvar"}
              styles={{
                width: 150,
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PedidoFormScreen;
