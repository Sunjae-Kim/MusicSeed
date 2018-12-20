const { Receipt, validate } = require("../../../models/receipt");

/* CRUD Operation */
/* Read */
exports.getAll = async (req, res) => {
  // Find
  const receipts = await Receipt.find()
    .sort("time");

  // Response
  res.send(receipts);
};

exports.getById = async (req, res) => {
  // Find
  const receipt = await Receipt.findById(req.params.id)
    .populate('from')
    .populate('to')
    .populate('product');

  if (!receipt)
    return res
      .status(404)
      .send(`The receipt with given ID(${req.params.id}) was not found.`);

  // Response
  res.send(receipt);
};

/* Create */
exports.post = async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Make and Save
  let receipt = new Receipt(req.body);
  receipt = await receipt.save();

  // Response
  res.send(receipt);
}

/* Update */
exports.patch = async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Find Music and Update
  const receipt = await Receipt.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // Response
  res.send(receipt);
}

/* Delete */
exports.delete = async (req, res) => {
  // Find and Delete
  const receipt = await Receipt.findByIdAndDelete(req.params.id);

  // Response
  res.send(receipt);
};