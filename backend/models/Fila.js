const { Client } = require('pg');
require('dotenv').config();

class Fila {
    constructor() {
        
        this.client = new Client({
            user: process.env.DB_USER, 
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

       
        this.client.connect()
            .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
            .catch((err) => console.error('Erro ao conectar ao banco de dados', err));
    }

    
    async buscarFila() {
        try {
            const query = `
                SELECT * 
                FROM pedidos 
                WHERE status = 0 -- Apenas pedidos pendentes entram na fila
                ORDER BY id_pedido ASC;
            `;
            console.log('Executando consulta para buscar fila:', query); 

            const result = await this.client.query(query);

            if (!result || !result.rows || result.rows.length === 0) {
                throw new Error('Nenhum pedido pendente encontrado.');
            }

            console.log('Pedidos encontrados:', result.rows); 

            return result.rows;
        } catch (error) {
            console.error('Erro ao buscar fila de pedidos:', error); 
            throw new Error('Erro ao buscar fila de pedidos.');
        }
    }

    
    async buscarPedidoPorId(id_pedido) {
        try {
            const query = `
                SELECT * 
                FROM pedidos 
                WHERE id_pedido = $1;
            `;
            console.log('Executando consulta para buscar pedido por ID:', query, id_pedido);

            const result = await this.client.query(query, [id_pedido]);

            if (!result || !result.rows || result.rows.length === 0) {
                throw new Error('Pedido não encontrado.');
            }

            console.log('Pedido encontrado:', result.rows[0]); 

            return result.rows[0];
        } catch (error) {
            console.error('Erro ao buscar pedido por ID:', error); 
            throw new Error('Erro ao buscar pedido por ID.');
        }
    }

   
    async consultarPosicao(id_pedido) {
        try {
            const fila = await this.buscarFila();  
            const posicao = fila.findIndex(pedido => pedido.id_pedido === id_pedido);

            if (posicao === -1) {
                throw new Error('Pedido não encontrado na fila.');
            }

            return { posicao: posicao + 1 };  
        } catch (error) {
            console.error('Erro ao consultar posição do pedido:', error);
            throw new Error('Erro ao consultar posição do pedido.');
        }
    }
}

module.exports = new Fila();
