const Country = require('../models/countrySchema');

const countryController = {
	createCountry: async (req, res) => {
		try {
			const { name } = req.body;
			const candidate = await Country.findOne({ name });

			if (candidate) {
				throw res.status(400).json({ message: 'This country already exists' });
			}
			const country = new Country({ name });
			await country.save();

			return res.status(201).json({ message: 'Country has been created' });
		} catch (e) {
			return res.status(500).json({ message: e });
		}
  },
  
  showAllCountries: async (req, res) => {
    try {
      const result = await Country.find();
			return res.json(result);
    } catch (e) {
      return res.status(500).json({ message: e });
    }
  },
};

module.exports = countryController;