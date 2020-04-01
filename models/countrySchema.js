const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  cities: [{ type: Types.ObjectId, ref: 'cities' }]
},
  { versionKey: false },
);

module.exports = model('country', schema);