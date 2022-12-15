const { Order, validate } = require('../models/order');
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const orders = await Order.find().sort('title');
  res.send(orders);
});

router.post('/', auth, async (req, res) => {
  const { error} = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category)
    return res.status(400).send('No category equal to the given ID was found.');

  let order = new Order({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name
    },
    contact: req.body.contact,
    status: req.body.status,
    payment: req.body.payment
  });
  
  order = await order.save();

  res.send(order);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category)
    return res.status(400).send('No category equal to the given ID was found.');

  const order = await Order.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name
      },
      contact: req.body.contact,
      status: req.body.status,
      payment: req.body.payment
    }, { new: true });

  if (!order)
    return res.status(404).send('No Order matching the given ID was found.');

  res.send(order);
});

router.delete('/:id', auth, async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);
  if (!order)
    return res.status(404).send('');

  res.send(order);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send('No order matching the given ID was found.');

  res.send(order);
});

module.exports = router; 