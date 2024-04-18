const router = require('express').Router();
const ReqModel = require('../../models/reqModel');


// UPDATE req_model
router.put('/:idfreq', async (req, res) => {
  try {
    const response = await ReqModel.findOneAndUpdate(
      { idfreq: req.params.idfreq },
      { statut_req: req.body.statut_req },
      { new: true }
    );

    if (!response) {
      return res.status(404).json({ msg: 'Response not found!' });
    }

    res.status(200).json({ msg: 'Response updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIST & SEARCH BY idfreq OF THE req_model
router.get('', async (req, res) => {
  try {
    const search = {};
    if (req.query.search) {
      search.idfreq = { $regex: req.query.search, $options: 'i' };
    }

    const req_model = await ReqModel.find(search);
    res.status(200).json(req_model);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
