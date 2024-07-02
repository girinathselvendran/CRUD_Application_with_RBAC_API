const express = require("express");
const router = express.Router();
const passport = require("passport");
const Customer = require("../../models/Customer");

// Create a new customer
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newCustomer = new Customer(req.body);
    newCustomer
      .save()
      .then((customer) => res.json(customer))
      .catch((error) => res.status(400).json({ message: error.message }));
  }
);

// Get all customers
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Customer.find()
      .populate("organizer", "name role")
      .then((customers) => res.json(customers))
      .catch((error) => res.status(500).json({ message: error.message }));
  }
);

// Get customers based on organizer
router.get(
  "/organizer/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Customer.find({ organizer: req.params.id })
      .then((customers) => res.json(customers))
      .catch((error) => res.status(500).json({ message: error.message }));
  }
);

// Update a customer
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((customer) => res.json(customer))
      .catch((error) => res.status(400).json({ message: error.message }));
  }
);

// Delete a customer
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
      .then(() => res.json({ success: true }))
      .catch((error) => res.status(500).json({ message: error.message }));
  }
);

module.exports = router;
