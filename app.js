const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const color = require('colors');
const cors = require('cors')

const app = express();

app.use(express.json({ extended: true }));
app.use(cors())
app.use('/api', require('./routes/countryRouter'), require('./routes/cityRouter'));
const PORT = config.get('port') || 5000;

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('connected');
	} catch (e) {
		console.log('Server error', e.message);
		process.exit(1);
	}
}

start();
app.listen(PORT, () => {
	console.log(color.magenta(`Running on port ${color.magenta.bgBlack(PORT)}`));
});