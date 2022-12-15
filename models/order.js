const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const Order = mongoose.model(
  "Orders",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    contact: {
      type: Number,
      required: true,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Viewed", "Completed"],
      required: true,
    },
    payment: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
  })
);

function validateOrder(order) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    contact: Joi.number().min(12),
    categoryId: Joi.string().required(),
    status: Joi.string().required(),
    payment: Joi.number().min(0).max(3000000),
  };

  return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateOrder;
