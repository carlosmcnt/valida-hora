const mapeamento = require('../utils/mapeamento');

function converterNomes(pedido) {
    let categoriaNome = '';
    let tipoNome = '';
    let subcategoriaNome = '';

    if (pedido.categoria == 1) {
        const categoria = mapeamento.categorias.categoria1.nome;
        const subcategoria = mapeamento.categorias.categoria1.subcategorias[pedido.subcategoria];
        categoriaNome = categoria;
        subcategoriaNome = subcategoria ? subcategoria.nome : 'Subcategoria desconhecida';
        tipoNome = subcategoria?.atividades[pedido.tipo] || 'Tipo desconhecido';
    } else if (pedido.categoria == 2) {
        categoriaNome = mapeamento.categorias.categoria2.nome;
        tipoNome = mapeamento.categorias.categoria2.atividades[pedido.tipo] || 'Tipo desconhecido';
        subcategoriaNome = tipoNome;
    } else if (pedido.categoria >= 10 && pedido.categoria <= 17) {
        const categoria = mapeamento.categorias.categoria1.subcategorias[pedido.categoria];
        categoriaNome = categoria ? categoria.nome : 'Categoria desconhecida';
        const tipo = categoria?.atividades[pedido.tipo];
        tipoNome = tipo || 'Tipo desconhecido';
        subcategoriaNome = tipoNome;
    } else if (pedido.categoria >= 200 && pedido.categoria <= 212) {
        categoriaNome = mapeamento.categorias.categoria2.nome || 'Categoria desconhecida';
        tipoNome = mapeamento.categorias.categoria2.atividades[pedido.tipo] || 'Tipo desconhecido';
        subcategoriaNome = tipoNome;
    } else {
        categoriaNome = 'Categoria desconhecida';
        tipoNome = 'Tipo desconhecido';
        subcategoriaNome = 'Subcategoria desconhecida';
    }

    const nomeCurso = mapeamento.cursoMapping[pedido.id_curso] || 'Curso desconhecido';
    const statusNome = mapeamento.statusMapping[pedido.status] || 'Status desconhecido';

    return {
        ...pedido,
        categoria: categoriaNome,
        subcategoria: subcategoriaNome,
        tipo: tipoNome,
        curso: nomeCurso,
        status: statusNome
    };
}

module.exports = { converterNomes };
