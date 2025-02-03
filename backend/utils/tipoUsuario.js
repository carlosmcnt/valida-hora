const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    client_encoding: 'UTF8'
});

client.connect().then(() => {
    console.log('Conectado ao banco de dados');
}).catch((error) => {
    console.log('Erro ao conectar ao banco de dados:', error);
});

async function determinarTipoUsuario(id_usuario) {
    
    const resultEstudante = await client.query('SELECT matricula_aluno FROM estudante WHERE id_usuario = $1', [id_usuario]);
    if (resultEstudante.rows.length > 0) {
        return { tipo: 'estudante', matricula: resultEstudante.rows[0].matricula_aluno };
    }

    const resultAvaliador = await client.query('SELECT id_usuario FROM avaliador WHERE id_usuario = $1', [id_usuario]);
    if (resultAvaliador.rows.length > 0) {
        return { tipo: 'avaliador' };
    }

    return { tipo: 'desconhecido' };
}

module.exports = { determinarTipoUsuario };
