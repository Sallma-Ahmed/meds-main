
const express = require('express');

const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userModel = require('../../models/userModel');

// CREATE USER
router.post('/', async (req, res) => {
  try {
    const user = new userModel({
      id_user: req.body.id_user,
      phone_user: req.body.phone_user,
      name_user: req.body.name_user,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10), 
      type: req.body.type,
      status: req.body.status,
      token: crypto.randomBytes(16).toString('hex'),
      role: req.body.role,
    });

    await user.save();
    res.status(200).json({ msg: 'User created successfully!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL USERS
router.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ USER BY ID
router.get('/:id_user', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id_user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found!' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE USER BY ID
router.put('/:id_user', async (req, res) => {
  try {
    const updatedUserData = {
      id_user: req.body.id_user,
      phone_user: req.body.phone_user,
      name_user: req.body.name_user,
      email: req.body.email,
      password: req.body.password, // Handle password update separately if needed
      type: req.body.type,
      status: req.body.status,
      token: req.body.token,
    };

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id_user,
      updatedUserData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    res.status(200).json({ msg: 'User updated successfully!', updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE USER BY ID
router.delete('/:id_user', async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id_user);

    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    res.status(200).json({ msg: 'User deleted successfully!', deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// LIST & SEARCH USER
router.get('', async (req, res) => {
  try {
    const search = {};
    if (req.query.search) {
      search.id_user = { $regex: req.query.search, $options: 'i' };
    }

    const users = await User.find(search);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FILTER BY TYPE
router.get('/type/:type', async (req, res) => {
  try {
    const users = await User.find({ type: req.params.type });

    if (!users.length) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FILTER BY STATUS
router.get('/status/:status', async (req, res) => {
  try {
    const users = await User.find({ status: req.params.status });

    if (!users.length) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;