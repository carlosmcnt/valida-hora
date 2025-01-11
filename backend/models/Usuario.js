const { Client } = require('pg');
require('dotenv').config();
const { criptografarSenha } = require('../utils/validador');

class Usuario {

    constructor() {
        this.client = new Client ({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        });

        this.client.connect().then(() => {
            console.log('Conectado ao banco de dados');
        }).catch((error) => {
            console.log('Erro ao conectar ao banco de dados:', error);
        });

    }

    async listarTodosUsuarios() {
        const result = await this.client.query('SELECT * FROM usuario');
        return result.rows;
    }

    async obterUsuarioPorId(id) {
        const result = await this.client.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
        return result.rows[0];
    }

    async deletarUsuarioPorId(id) {
        await this.client.query('DELETE FROM usuario WHERE id_usuario = $1', [id]);
    }

    async criarUsuario(usuario) {
        const senhaCriptografada = criptografarSenha(usuario.senha);
        await this.client.query('INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)', [usuario.nome, usuario.email, senhaCriptografada]);
    }

}

module.exports = new Usuario();