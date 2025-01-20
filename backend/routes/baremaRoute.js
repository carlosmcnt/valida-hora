const { express } = require('express');

const { BaremaController } = require('../controllers/baremaController');

const router = express.Router();

router.post('/criar', BaremaController.criarBarema);
router.get('/categorias/:id_curso', BaremaController.obterCategoriasPorIdCurso);
router.get('/subcategorias/:id_curso', BaremaController.obterSubcategoriasPorIdCurso);
router.get('/tipos/:id_curso', BaremaController.obterTiposPorIdCurso);

module.exports = router;