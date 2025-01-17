const { Client } = require('pg');
const { criptografarSenha } = require('../utils/validador');
require('dotenv').config();

class Estudante {
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

    async listarTodosEstudantes() {
        const query = `SELECT e.id_usuario, u.nome, u.email, e.matricula_aluno, e.id_curso 
            FROM Estudante e
            INNER JOIN Usuario u ON e.id_usuario = u.id_usuario`;
        const result = await this.client.query(query);
        return result.rows;
    }

    async obterEstudantePorId(id) {
        const query = `SELECT e.id_usuario, u.nome, u.email, e.matricula_aluno, e.id_curso
            FROM Estudante e
            INNER JOIN Usuario u ON e.id_usuario = u.id_usuario
            WHERE e.id_usuario = $1`;
        const result = await this.client.query(query, [id]);
        return result.rows[0];
    }

    async criarEstudante(estudante) {
        const queryUsuario = `INSERT INTO Usuario (nome, email, senha) 
            VALUES ($1, $2, $3) 
            RETURNING id_usuario`;
        const senhaCriptografada = criptografarSenha(estudante.senha);
        const resultUsuario = await this.client.query(queryUsuario, [estudante.nome, estudante.email, senhaCriptografada]);
        const idUsuario = resultUsuario.rows[0].id_usuario;

        const queryEstudante = `INSERT INTO Estudante (id_usuario, matricula_aluno, id_curso) 
            VALUES ($1, $2, $3)`;
        await this.client.query(queryEstudante, [idUsuario, estudante.matricula_aluno, estudante.id_curso]);
    }

    async deletarEstudante(id) {
        const queryEstudante = `DELETE FROM Estudante WHERE id_usuario = $1`;
        await this.client.query(queryEstudante, [id]);
        const queryUsuario = `DELETE FROM Usuario WHERE id_usuario = $1`;
        await this.client.query(queryUsuario, [id]);
    }
}

module.exports = new Estudante();