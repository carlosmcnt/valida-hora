import React, { useState } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { FormButton } from "../../components/FormButton";
import { style } from "../../styles/headerStyles";
import { useNavigate } from "react-router-dom";

import barema from "../../assets/barema.svg";
import { formStyle } from "../../styles/formLoginStyle";

const PedidoFormScreen = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
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
          padding: 32,
          borderRadius: 8,
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
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                value={"Maria da Silva"} //preencher com nome do usuário
                style={formStyle.input}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="registration">Matrícula:</label>
              <input
                type="text"
                value={"202419874"} //preencher matricula
                style={formStyle.input}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="course">Curso:</label>
              <input
                type="text"
                value={"Ciência da Computação"}
                style={formStyle.input}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              placeholder="Digite aqui os detalhes do pedido"
              style={{
                height: "50px",
                ...formStyle.input,
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
              <label htmlFor="dtBegin">Data Início:</label>
              <input type="date" style={formStyle.input} />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="dtEnd">Data Fim:</label>
              <input type="date" style={formStyle.input} />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="chTotal">CH Total:</label>
              <input
                type="text"
                placeholder="50 horas"
                style={formStyle.input}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="chRequired">CH Pretendida:</label>
              <input
                type="text"
                placeholder="20 horas"
                style={formStyle.input}
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
              <label htmlFor="category">Selecione a categoria:</label>
              <select style={formStyle.input}>
                <option value="">Categoria 1</option>
                <option value="">Categoria 2</option>
                <option value="">Categoria 3</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="subCategory">Selecione a subcategoria:</label>
              <select style={formStyle.input}>
                <option value="">Subcategoria 1</option>
                <option value="">Subcategoria 2</option>
                <option value="">Subcategoria 3</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="type">Selecione o tipo:</label>
              <select style={formStyle.input}>
                <option value="">Tipo 1</option>
                <option value="">Tipo 2</option>
                <option value="">Tipo 3</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            <div style={{ marginTop: 16, marginBottom: 16 }}>
              <input
                type="file"
                id="fileInput"
                style={formStyle.hiddenInput}
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput" style={formStyle.button}>
                Selecionar Arquivo
              </label>
              {fileName && <span style={formStyle.fileName}>{fileName}</span>}
            </div>
          </div>
          <div
            style={{
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            <label htmlFor="barema">Barema</label>
            <button
              style={{ border: "none", background: "none", marginLeft: 10 }}
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
                backgroundColor: "#288be5",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PedidoFormScreen;
