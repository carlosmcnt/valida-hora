const { Client } = require('pg');
require('dotenv').config();
const { criptografarSenha, descriptografarSenha } = require('../utils/validador');

class Usuario {
    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            client_encoding: 'UTF8'
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

        if (result.rows.length === 0) {
            return null;
        }

        const usuario = result.rows[0];

        
        const resultEstudante = await this.client.query('SELECT matricula_aluno FROM estudante WHERE id_usuario = $1', [id]);
        if (resultEstudante.rows.length > 0) {
            usuario.tipo = 'estudante';
            usuario.matricula = resultEstudante.rows[0].matricula_aluno;
            return usuario;
        }

        
        const resultAvaliador = await this.client.query('SELECT id_usuario FROM avaliador WHERE id_usuario = $1', [id]);
        if (resultAvaliador.rows.length > 0) {
            usuario.tipo = 'avaliador';
            return usuario;
        }

        usuario.tipo = 'desconhecido';
        return usuario;
    }

    async obterUsuarioPorEmail(email) {
        const result = await this.client.query('SELECT * FROM usuario WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return null;
        }

        const usuario = result.rows[0];

        
        const resultEstudante = await this.client.query('SELECT matricula_aluno FROM estudante WHERE id_usuario = $1', [usuario.id_usuario]);
        if (resultEstudante.rows.length > 0) {
            usuario.tipo = 'estudante';
            usuario.matricula = resultEstudante.rows[0].matricula_aluno;
            return usuario;
        }

        
        const resultAvaliador = await this.client.query('SELECT id_usuario FROM avaliador WHERE id_usuario = $1', [usuario.id_usuario]);
        if (resultAvaliador.rows.length > 0) {
            usuario.tipo = 'avaliador';
            return usuario;
        }

        usuario.tipo = 'desconhecido';
        return usuario;
    }

    async deletarUsuarioPorId(id) {
        await this.client.query('DELETE FROM usuario WHERE id_usuario = $1', [id]);
    }

    async criarUsuario(usuario) {
        const senhaCriptografada = criptografarSenha(usuario.senha);
        await this.client.query('INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3)', [usuario.nome, usuario.email, senhaCriptografada]);
    }

    async login(email, senha) {
        const usuario = await this.obterUsuarioPorEmail(email);

        if (!usuario) {
            return null;
        }

        const senhaDescriptografada = descriptografarSenha(usuario.senha);
        return senhaDescriptografada === senha ? usuario : null;
    }
}

module.exports = new Usuario();
