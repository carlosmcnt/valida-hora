import {create} from 'zustand';

const useUserStore = create((set) => ({
  user: null, // Valor inicial, não logado
  estudante: null,
  curso: null,
  //  armazenar as informações do usuário
  setUser: (user) => set({ user }),

  // logout e limpar as informações
  logout: () => set({ user: null }),

  // Função para obter o id do usuário logado
  setEstudante: (estudante) => set({estudante}),

  //verificar se o usuário está logado
  isLoggedIn: () => set((state) => state.user !== null),

  setCurso: (curso) => set({curso})
}));

export default useUserStore;
