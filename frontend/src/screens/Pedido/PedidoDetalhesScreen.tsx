import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { cursos, formatarData, statusMapping } from "./Pedido-utils";
import { HeaderPage } from "../../components/HeaderPage";
import { style } from "../../styles/headerStyles";
import { formStyle } from "../../styles/formLoginStyle";
import { FormButton } from "../../components/FormButton";
import barema from "../../assets/barema.svg";

const PedidoDetalhesScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados locais para avaliação do pedido
  const [status, setStatus] = useState(""); 
  const [cargaHorariaAprovada, setCargaHorariaAprovada] = useState(""); 
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/pedidos/pedido/${id}`
        );
        setPedido(response.data);

        // Definir os valores iniciais com os dados do pedido
        setStatus(response.data.status || "");
        setCargaHorariaAprovada(response.data.carga_horaria_aprovada || "");
        setComentario(response.data.comentario || "");
      } catch (err) {
        setError("Erro ao buscar detalhes do pedido");
      } finally {
        setLoading(false);
      }
    };
    fetchPedido();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dadosAvaliacao = {
      status,
      ch_aprovada: Number(cargaHorariaAprovada), // Converter para número
      comentario,
    };

    try {
      await axios.post(
        `http://localhost:3000/pedidos/avaliar/${id}`,
        dadosAvaliacao
      );

      alert("Pedido avaliado com sucesso!");

      navigate(-1); // Redirecionar para a lista de pedidos
    } catch (error) {
      alert("Erro ao avaliar pedido.");
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 16 }}>
      <HeaderPage style={style} />
      <div style={{ width: "900px", padding: 32, borderRadius: 8 }}>
        <h2>Pedido {id}</h2>
        <div style={{ justifyContent: "space-between", marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <div><strong>Nome: </strong>{pedido.nome}</div>
            <div><strong>Matrícula:</strong> {pedido.matricula_aluno}</div>
            <div><strong>Curso: </strong>{cursos[pedido.id_curso]?.nome}</div>
          </div>
          <p><strong>Descrição:</strong> {pedido.descricao}</p>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <div><strong>Data Início:</strong> {formatarData(pedido.data_inicio)}</div>
            <div><strong>Data Fim:</strong> {formatarData(pedido.data_fim)}</div>
            <div><strong>CH Total:</strong> {pedido.ch_total} horas</div>
            <div><strong>CH Pretendida:</strong> {pedido.ch_pretendida} horas</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: "20px" }}>
            <div><strong>Categoria:</strong> {pedido.categoria}</div>
            {pedido.categoria !== "Extensão" && (
              <div><strong>Subcategoria:</strong> {pedido.subcategoria}</div>
            )}
            <div><strong>Tipo:</strong> {pedido.tipo}</div>
          </div>

          {/* Campos de Avaliação */}
          <div style={{ alignItems: "center", marginTop: "10px", marginBottom: "10px", display: "flex", flexDirection: "row", gap: 16 }}>
            <strong>Decisão:</strong>
            <select 
              style={{ ...formStyle.input, width: "20%" }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusMapping.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.nome.toUpperCase()}
                </option>
              ))}
            </select>

            <strong>CH Aprovada:</strong>
            <input
              type="number"
              value={cargaHorariaAprovada}
              onChange={(e) => setCargaHorariaAprovada(e.target.value)}
              style={{ ...formStyle.input, width: "20%" }}
            />
         
            <strong>Comprovantes:</strong>
            <button style={{ border: "none", background: "none", marginLeft: 10 }} type="button">
              <img src={barema} alt="comprovante" style={{ width: 25 }} />
            </button>
          </div>

          <strong>Comentário:</strong>
          <input
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            style={formStyle.input}
          />

          {/* Botões */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <FormButton
              value={"Finalizar"}
              type="button"
              styles={{ width: 150 }}
              onClick={() => navigate("/pedido/lista")}
            />
            <FormButton
              value={"Salvar"}
              type="submit"
              styles={{ width: 150, backgroundColor: "#288be5" }}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoDetalhesScreen;
