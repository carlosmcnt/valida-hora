import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { FormButton } from "../../components/FormButton";
import { style } from "../../styles/headerStyles";
import { useNavigate } from "react-router-dom";

import { formStyle } from "../../styles/formLoginStyle";
import useUserStore from "../../auth-store";
import UsuarioService from "../../services/UsuarioService";
import axios from "axios";
import { categorias, cursos } from "./Pedido-utils";
import usePedidoStore from "./Pedido-store";

const PedidoFormScreen = () => {
  const navigate = useNavigate();

  const { setEstudante, estudante } = useUserStore();
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

  const {
    descricao,
    dataInicio,
    dataFim,
    horasTotais,
    horasPretendidas,
    categoria,
    subcategoria,
    tipo,
    comprovante,
    setPedido,
    resetPedido,
  } = usePedidoStore();

  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPedido({ comprovante: file });
    }
  };

  const getEstudante = async () => {
    try {
      const estudante = await UsuarioService.getAluno(usuarioSalvo?.usuario.id_usuario);
      setEstudante(estudante);
    } catch (error) {
      alert(error.message || "Erro ao buscar estudante");
    }
  };

  useEffect(() => {
    getEstudante();
  }, [usuarioSalvo?.usuario.id_usuario]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!descricao || !dataInicio || !dataFim || !horasTotais || !horasPretendidas) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }


    const formData = new FormData();
    formData.append("id_usuario", String(estudante?.id_usuario));
    formData.append("descricao", descricao);
    formData.append("data_inicio", dataInicio);
    formData.append("data_fim", dataFim);
    formData.append("ch_total", horasTotais);
    formData.append("ch_pretendida", horasPretendidas);
    formData.append("categoria", categoria);
    formData.append("subcategoria", subcategoria);
    formData.append("tipo", tipo);

    if (comprovante) {
      formData.append("comprovante", comprovante);
    }

    try {
      await axios.post("http://localhost:3000/pedidos/criar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Pedido criado com sucesso!");
      resetPedido();
      navigate("/menu");
    } catch (error) {
      alert("Erro ao criar pedido.");
      console.error(error);
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
          onSubmit={handleSubmit}
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
                value={usuarioSalvo?.usuario.nome}
                style={formStyle.input}
                disabled={true}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="registration">Matrícula:</label>
              <input
                type="text"
                value={estudante?.matricula_aluno}
                style={formStyle.input}
                disabled={true}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="course">Curso:</label>
              <input
                type="text"
                value={cursos[estudante?.id_curso]?.nome}
                style={formStyle.input}
                disabled={true}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              placeholder="Digite aqui os detalhes do pedido"
              onChange={(e) => setPedido({ descricao: e.target.value })}
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
              <input
                type="date"
                style={formStyle.input}
                value={dataInicio}
                onChange={(e) => setPedido({ dataInicio: e.target.value })} />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="dtEnd">Data Fim:</label>
              <input
                type="date"
                style={formStyle.input}
                value={dataFim}
                onChange={(e) => setPedido({ dataFim: e.target.value })} />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="chTotal">CH Total:</label>
              <input
                type="text"
                value={horasTotais} onChange={(e) => setPedido({ horasTotais: e.target.value })}
                style={formStyle.input}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="chRequired">CH Pretendida:</label>
              <input
                type="text"
                value={horasPretendidas}
                onChange={(e) => setPedido({ horasPretendidas: e.target.value })}
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
              <select
                id="selectCategoria"
                style={formStyle.input}
                value={categoria}
                onChange={(e) => setPedido({ categoria: e.target.value, subcategoria: "", tipo: "" })}>
                <option value=''>Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
            {categoria === '1' &&
              <div style={{ flex: 1 }}>
                <select
                  style={formStyle.input}
                  value={subcategoria}
                  onChange={(e) => setPedido({ subcategoria: e.target.value })}>
                  <option value="">Selecione uma subcategoria</option>
                  {Object.entries(categorias.find(cat => cat.value === categoria)?.subcategorias || {}).map(([key, value]) => (
                    <option key={key} value={key}>{value.nome}</option>
                  ))}
                </select>
              </div>}
            <div style={{ flex: 1 }}>
              <select style={formStyle.input} value={tipo} onChange={(e) => setPedido({ tipo: e.target.value })}>
                <option value="">Selecione um tipo</option>
                {Object.entries(categorias.find(cat => cat.value === categoria)?.atividades || categorias.find(cat => cat.value === categoria)?.subcategorias?.[subcategoria]?.atividades || {}).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
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
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 32,
              marginTop: 24,
            }}
          >
            <FormButton
              value={"Finalizar"}
              type="button"
              styles={{
                width: 150,
              }}
              onClick={() => { resetPedido(), navigate("/menu") }}
            />
            <FormButton
              value={"Salvar"}
              type="submit"
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
