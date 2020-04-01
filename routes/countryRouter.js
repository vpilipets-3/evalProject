const { Router } = require('express');
const { check } = require('express-validator');
const countryController = require('../controllers/country.controller');

const router = Router();

router.post(
	'/createCountry',
	[
		check('name', 'Invalid name').exists().isString()
	],
	countryController.createCountry,
);

router.get('/showCountries', countryController.showAllCountries);

module.exports = router;