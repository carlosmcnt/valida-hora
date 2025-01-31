import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const UsuarioService = {
  async login(email, senha) {
    try {
      const response = await axios.post(`${API_BASE_URL}/usuarios/login`, { email, senha });
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error.message);
      throw error.response?.data || { message: "Erro ao fazer login" };
    }
  },
  async getAluno(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/estudantes/${id}`);
      return response.data;
      
    } catch (error) {
      console.error("Erro ao buscar aluno:", error.response?.data || error.message);
      throw error.response?.data || { message: "Erro ao buscar aluno" };
    }
  },
};
export default UsuarioService;

