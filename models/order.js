const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const Order = mongoose.model("Orders", new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    contact: {
      type: Number,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    courseTitle: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    payment: {
      type: Number,
      required: true,
    },
  })
);

function validateOrder(order) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    contact: Joi.number().min(3).max(50).required(),
    categoryId: Joi.string().required(),
    payment: Joi.number().min(0),
  };

  return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateOrder;
