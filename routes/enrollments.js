const { Enrollment, validate } = require('../models/enrollment');
const { Course } = require('../models/course');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const enrollments = await Enrollment.find().sort('-dateStart');
  res.send(enrollments);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer)
    return res.status(404).send('No client found matching the given ID');

  const course = await Course.findById(req.body.courseId);
  if (!course)
    return res.status(404).send('No course matching the given ID was found.');

  let enrollment = new Enrollment({
    customer: {
      _id: customer._id,
      name: customer.name
    },
    course: {
      _id: course._id,
      title: course.title
    },
    courseFee: course.fee
  });
  if (customer.isVip)
    enrollment.courseFee = course.fee - (0.2 * course.fee); //discount for vip customers

  enrollment = await enrollment.save();

  customer.bonusPoints++;
  customer.save();

  res.send(enrollment);
});

router.get('/:id', async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment)
    return res.status(404).send('No receipt was found equal to the given ID.');

  res.send(enrollment);
});

module.exports = router; 