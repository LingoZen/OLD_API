var LanguageController = require('../controllers/languages');

var express = require('express');
var router = express.Router();


//define language routes
router.get('/', LanguageController.getAll);
router.get('/:id', LanguageController.getById);

router.post('/', LanguageController.create);

router.put('/:id', LanguageController.update);

router.delete('/:id', LanguageController.remove);


//export routes
module.exports = router;
