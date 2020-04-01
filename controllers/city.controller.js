const City = require('../models/citySchema');

const cityController = {
  showAllCities: async (req, res) => {
    try {
      const result = await City.find({ countryId: req.params.countryId });
			return res.json(result);
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  },
	createCity: async (req, res) => {
		try {
			const {
				name, description, hotels, isCapital, avaliableIn, countryId,
			} = req.body;
			const candidate = await City.findOne({ name });

			if (candidate) {
				throw res.status(400).json({ message: 'City with this name already exists' });
			}
			const city = new City({
        name, description, hotels, isCapital, avaliableIn, countryId
			});
			await city.save();

			return res.status(201).json({ message: 'City has been created' });
		} catch (e) {
			return res.status(500).json({ message: e });
		}
	},
	deleteCity: async (req, res) => {
		try {
			await City.findById(req.params.cityId).deleteOne();
			return res.sendStatus(204);
		} catch (e) {
			return res.status(500).json({ message: e });
		}
	},
	updateCity: async (req, res) => {
		try {
			const city = await City.findById(req.params.cityId);
      city = {
        ...req.body
      }
			await city.save();
			return res.json(city);
		} catch (e) {
			return res.status(500).json({ message: 'Internal server error' });
		}
  },
  
};

module.exports = cityController;