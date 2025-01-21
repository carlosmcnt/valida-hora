const { Client } = require('pg');
require('dotenv').config();

class Curso {
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

    async criarCurso(curso) {
        const query = `INSERT INTO Curso (nome, coordenador, departamento, ch_extensao, ch_complementar) 
        VALUES  ($1, $2, $3, $4, $5)`;
        await this.client.query(query, [curso.nome, curso.coordenador, curso.departamento, curso.ch_extensao, curso.ch_complementar]);
    }

    async obterNomeTodosCursos() {
        const query = `SELECT nome FROM Curso`;
        const result = await this.client.query(query);
        return result.rows;
    }

    async obterCargaHorariaTotalExtensaoPorCursoId(id) {
        const query = `SELECT ch_extensao FROM Curso WHERE id_curso = $1`;
        const result = await this.client.query(query, [id]);
        return result.rows[0];
    }

    async obterCargaHorariaTotalComplementarPorCursoId(id) {
        const query = `SELECT ch_complementar FROM Curso WHERE id_curso = $1`;
        const result = await this.client.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new Curso();