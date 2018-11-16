const Joi = require("joi");
const mongoose = require("mongoose");

const receipt_schema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, refPath: 'onModel' },
  onModel: { type: String, enum: ['Album', 'Music'] },
  time: { type: Date, default: Date.now() }
});

const Receipt = mongoose.model('Receipt', receipt_schema);

function validate_receipt(receipt) {
  const schema = {
    from: Joi.string(),
    to: Joi.string(),
    amount: Joi.number(),
    product: Joi.string(),
    onModel: Joi.string(),
    time: Joi.date().default()
  };
  return Joi.validate(receipt, schema);
}

exports.Receipt = Receipt;
exports.validate = validate_receipt;
exports.receipt_schema = receipt_schema;