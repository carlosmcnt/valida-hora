import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Substitua pela URL correta do backend

const UsuarioService = {
  async login(email, senha) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, senha });
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error.message);
      throw error.response?.data || { message: "Erro desconhecido" };
    }
  },
};

export default UsuarioService;
