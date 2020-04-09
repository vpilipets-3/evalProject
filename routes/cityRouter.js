const { Router } = require('express');
const { check } = require('express-validator');
const cityController = require('../controllers/city.controller');
const router = Router();

router.get('/citiesIn/:countryId', cityController.showAllCities);

router.post(
	'/createCity',
	[
		check('name', 'Invalid name').exists().isString(),
		check('description', 'Description is necessary').exists().isString(),
		// check('hotels', 'Name required').exists(),
    check('isCapital', 'isCaptial?').exists(),
    check('avaliableIn', 'whenAvaliable?').exists().isString(),
	],
	cityController.createCity,
);

router.put(
	'/cities/:cityId',
	[
    check('name', 'Invalid name').exists().isString(),
		check('description', 'Description is necessary').exists().isString(),
		// check('hotels', 'Name required').exists(),
    check('isCapital', 'isCaptial?').exists(),
    check('avaliableIn', 'whenAvaliable?')
	],
	cityController.updateCity,
);

module.exports = router;