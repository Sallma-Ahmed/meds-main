const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Med = require('../../models/medModel');
// ADD MED
router.post('/', async (req, res) => {
  try {
    const med = new Med({
      id_med: req.body.id_med,
      price: req.body.price,
      Name_meds: req.body.Name_meds,
      description_meds: req.body.description_meds,
      Expiration_date: req.body.Expiration_date,
      userfid: req.body.userfid,
      namefcategory: req.body.namefcategory,
    });

    await med.save();
    res.status(200).json({ msg: 'Med created successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE MED
router.put('/:id_med', async (req, res) => {
  try {
    const med = await Med.findOneAndUpdate(
      { id_med: req.params.id_med },
      { price: req.body.price },
      { new: true }
    );

    if (!med) {
      return res.status(404).json({ msg: 'Med not found!' });
    }

    res.status(200).json({ msg: 'Med updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE MED
router.delete('/delete/:id_med', async (req, res) => {
  try {
    const med = await Med.findOneAndDelete({ id_med: req.params.id_med });

    if (!med) {
      return res.status(404).json({ msg: 'Med not found!' });
    }

    res.status(200).json({ msg: 'Med deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIST & SEARCH MED
router.get('/', async (req, res) => {
  try {
    const search = {};
    if (req.query.search) {
      search.Name_meds = { $regex: req.query.search, $options: 'i' };
    }

    const meds = await Med.find(search);
    res.status(200).json(meds);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
