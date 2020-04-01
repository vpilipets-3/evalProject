const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: false },
  hotels: [{type: String, required: true }],
  isCapital: { type: Boolean, required: true },
  avaliableIn: { type: String,  required: true },
  countryId: { type: Types.ObjectId, ref: 'country' }
},
  { versionKey: false },
);

module.exports = model('cities', schema);