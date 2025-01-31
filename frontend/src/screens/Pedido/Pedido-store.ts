import { create } from "zustand";

interface PedidoState {
  descricao: string;
  dataInicio: string;
  dataFim: string;
  horasTotais: string;
  horasPretendidas: string;
  categoria: string;
  subcategoria: string;
  tipo: string;
  comprovante: File | null;
  setPedido: (pedido: Partial<PedidoState>) => void;
  resetPedido: () => void;
}

const usePedidoStore = create<PedidoState>((set) => ({
  descricao: "",
  dataInicio: "",
  dataFim: "",
  horasTotais: "",
  horasPretendidas: "",
  categoria: "",
  subcategoria: "",
  tipo: "",
  comprovante: null,

  setPedido: (pedido) => set((state) => ({ ...state, ...pedido })),
  resetPedido: () =>
    set({
      descricao: "",
      dataInicio: "",
      dataFim: "",
      horasTotais: "",
      horasPretendidas: "",
      categoria: "",
      subcategoria: "",
      tipo: "",
      comprovante: null,
    }),
}));

export default usePedidoStore;
