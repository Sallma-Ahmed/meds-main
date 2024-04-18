const router = require('express').Router();
const Med = require('../../models/medModel');

// Search medicine_model by Name_meds with history logging
router.get('/:id_user', async (req, res) => {
  try {
    let search = {};
    if (req.query.search) {
      // Set up the search query for Mongoose
      search = { Name_meds: { $regex: req.query.search, $options: 'i' } };

      // Save the search value, time, and result to the history collection
      const { search: searchValue, id_user: idfuser } = req.query;
      const timefsearch = new Date();
      const historyEntry = { idfuser, search: searchValue, timefsearch, status: 0 }; // Assume not found initially

      // Check if the medicine exists in MongoDB
      const medicineExists = await Med.findOne(search);
      if (medicineExists) {
        historyEntry.status = 1; // Found
      }

      // Save the history entry
      // Assuming you have a HistoryModel defined in a similar way as MedicineModel
      // const HistoryModel = require('../../models/HistoryModel');
      // const historyRecord = new HistoryModel(historyEntry);
      // await historyRecord.save();
    }

    const medicine_model = await MedicineModel.find(search);
    if (medicine_model.length > 0) {
      res.status(200).json(medicine_model);
    } else {
      res.status(404).json({ ms: 'Med not found!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Filter medicine_model by userfid
router.get('/user/:userfid', async (req, res) => {
  try {
    const med = await MedicineModel.find({ userfid: req.params.userfid });
    if (!med || med.length === 0) {
      return res.status(404).json({ ms: 'Med not found!' });
    }
    res.status(200).json(med);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Filter medicine_model by namefcategory
router.get('/category/:namefcategory', async (req, res) => {
  try {
    const med = await MedicineModel.find({ namefcategory: req.params.namefcategory });
    if (!med || med.length === 0) {
      return res.status(404).json({ ms: 'Med not found!' });
    }
    res.status(200).json(med);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
