const { Client } = require('pg');
const { criptografarSenha } = require('../utils/validador');
require('dotenv').config();

class Avaliador {
    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

        this.client.connect()
            .then(() => console.log('Conectado ao banco de dados'))
            .catch((error) => console.log('Erro ao conectar ao banco de dados:', error));
    }

    async listarTodosAvaliadores() {
        const query = `SELECT a.id_usuario, u.nome, u.email, a.matricula_docente, a.departamento, a.id_perfil_avaliador
            FROM Avaliador a
            INNER JOIN Usuario u ON a.id_usuario = u.id_usuario`;
        const result = await this.client.query(query);
        return result.rows;
    }

    async obterAvaliadorPorId(id) {
        const query = `SELECT a.id_usuario, u.nome, u.email, a.matricula_docente, a.departamento, a.id_perfil_avaliador
            FROM Avaliador a
            INNER JOIN Usuario u ON a.id_usuario = u.id_usuario
            WHERE a.id_usuario = $1`;
        const result = await this.client.query(query, [id]);
        return result.rows[0];
    }

    async criarAvaliador(avaliador) {
        const queryUsuario = `INSERT INTO Usuario (nome, email, senha) 
            VALUES ($1, $2, $3) 
            RETURNING id_usuario`;
        const senhaCriptografada = criptografarSenha(avaliador.senha);
        const resultUsuario = await this.client.query(queryUsuario, [avaliador.nome, avaliador.email, senhaCriptografada]);
        const idUsuario = resultUsuario.rows[0].id_usuario;

        const queryAvaliador = `INSERT INTO Avaliador (id_usuario, matricula_docente, departamento, id_perfil_avaliador) 
            VALUES ($1, $2, $3)`;
        await this.client.query(queryAvaliador, [idUsuario, avaliador.matricula_docente, avaliador.departamento, avaliador.id_perfil_avaliador]);
    }

    async deletarAvaliador(id) {
        const queryAvaliador = `DELETE FROM Avaliador WHERE id_usuario = $1`;
        await this.client.query(queryAvaliador, [id]);
        const queryUsuario = `DELETE FROM Usuario WHERE id_usuario = $1`;
        await this.client.query(queryUsuario, [id]);
    }
}

module.exports = new Avaliador();