const { Client } = require('pg');
require('dotenv').config();

const { categoria1Mapping, categoria2Mapping, cursoMapping, statusMapping } = require('../utils/mapeamento');

class Cancelamento {
    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            charset: 'UTF8',
        });

        this.client.connect().then(() => {
            console.log('Conectado ao banco de dados para cancelamento');
        }).catch((error) => {
            console.log('Erro ao conectar ao banco de dados para cancelamento:', error);
        });
    }

    async cancelarPedido(id_pedido) {
        if (!Number.isInteger(id_pedido) || id_pedido <= 0) {
            throw new Error('ID do pedido inválido.');
        }

        const verificarStatusQuery = 'SELECT * FROM pedidos WHERE id_pedido = $1';
        const statusResult = await this.client.query(verificarStatusQuery, [id_pedido]);

        if (statusResult.rows.length === 0) {
            throw new Error('Pedido não encontrado.');
        }

        const pedido = statusResult.rows[0];

        if (pedido.status !== 0) { 
            throw new Error('Somente pedidos com status "pendente" podem ser cancelados.');
        }

        
        const categoriaNome = categoria1Mapping[pedido.categoria]?.nome || categoria2Mapping[pedido.categoria] || 'Categoria desconhecida';
        const subcategoriaNome = pedido.subcategoria ? categoria1Mapping[pedido.categoria]?.tipos[pedido.subcategoria] || 'Subcategoria desconhecida' : null;
        const tipoNome = pedido.tipo ? categoria1Mapping[pedido.categoria]?.tipos[pedido.tipo] || 'Tipo desconhecido' : null;
        const cursoNome = cursoMapping[pedido.id_curso] || 'Curso desconhecido';
        const statusNome = statusMapping[pedido.status] || 'desconhecido';

        
        const pedidoDetalhado = {
            ...pedido,
            categoriaNome,
            subcategoriaNome,
            tipoNome,
            cursoNome,
            statusNome,
        };

        const deleteQuery = 'DELETE FROM pedidos WHERE id_pedido = $1 RETURNING *';
        await this.client.query(deleteQuery, [id_pedido]);

        return { pedido: pedidoDetalhado }; 
    }
}

module.exports = new Cancelamento();
