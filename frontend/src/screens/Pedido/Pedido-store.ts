import { create } from "zustand";

interface PedidoState {
  id_pedido: number | null;  // Adicionamos o id_pedido no estado
  descricao: string;
  dataInicio: string;
  dataFim: string;
  horasTotais: string;
  horasPretendidas: string;
  categoria: string;
  subcategoria: string;
  tipo: string;
  comprovante: File | null;
  status: number;
  carga_horaria_aprovada: number;
  setPedido: (pedido: Partial<PedidoState>) => void;
  resetPedido: () => void;
}

const usePedidoStore = create<PedidoState>((set) => ({
  id_pedido: null,  // Inicializa o id_pedido como null
  descricao: "",
  dataInicio: "",
  dataFim: "",
  horasTotais: "",
  horasPretendidas: "",
  categoria: "",
  subcategoria: "",
  tipo: "",
  comprovante: null,
  status: 0,
  carga_horaria_aprovada: 0,

  // Função para atualizar os dados do pedido, incluindo o id_pedido
  setPedido: (pedido) => set((state) => ({ ...state, ...pedido })),

  // Função para resetar o pedido, incluindo o id_pedido
  resetPedido: () =>
    set({
      id_pedido: null,  // Resetando o id_pedido para null
      descricao: "",
      dataInicio: "",
      dataFim: "",
      horasTotais: "",
      horasPretendidas: "",
      categoria: "",
      subcategoria: "",
      tipo: "",
      comprovante: null,
      status: 0,
      carga_horaria_aprovada: 0,
    }),
}));

export default usePedidoStore;
