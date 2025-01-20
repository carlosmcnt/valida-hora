const { Client } = require('pg');
require('dotenv').config();

class Barema {

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

    async criarBarema(barema) {
        const query = `INSERT INTO Barema (id_curso, data_atualizacao, categorias, subcategorias, tipos) 
        VALUES  ($1, $2, $3, $4, $5)`;
        const values = [
            barema.id_curso,
            barema.data_atualizacao,
            barema.categorias,
            barema.subcategorias,
            barema.tipos
        ];
        const result = await this.client.query(query, values);
        return result.rows[0];
    }

    async obterCategoriasPorIdCurso(id_curso) {
        const query = 'SELECT categorias FROM Barema WHERE id_curso = $1';
        const result = await this.client.query(query, [id_curso]);
        return result.rows[0];
    }

    async obterSubcategoriasPorIdCurso(id_curso) {
        const query = 'SELECT subcategorias FROM Barema WHERE id_curso = $1';
        const result = await this.client.query(query, [id_curso]);
        return result.rows[0];
    }

    async obterTiposPorIdCurso(id_curso) {
        const query = 'SELECT tipos FROM Barema WHERE id_curso = $1';
        const result = await this.client.query(query, [id_curso]);
        return result.rows[0];
    }
}