const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const ReqModel = require('../../models/reqModel');

// Add request
router.post( '',
  body('namenewca').isString().withMessage('Please enter a valid category name').isLength({ min: 1 }),
  body('nameofuser').isString().withMessage('Please enter a valid username').isLength({ min: 1 }),
  body('namenewmeds').isString().withMessage('Please enter a valid medicine name').isLength({ min: 1 }),
  body('status').isString().isLength({ min: 1 }),
  async (req, res) => {
    try {
      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Prepare request object
      const request = new ReqModel({
        idfreq: req.body.idfreq,
        nameofuser: req.body.nameofuser,
        namenewca: req.body.namenewca,
        namenewmeds: req.body.namenewmeds,
        status: req.body.status,
      });

      // Save request to DB
      await request.save();
      res.status(200).json({ msg: 'Request created successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// List & search requests by status
router.get('', async (req, res) => {
  try {
    let search = {};
    if (req.query.search) {
      // Search by status
      search = { statut_req: { $regex: req.query.search, $options: 'i' } };
    }
    const requests = await ReqModel.find(search);
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Filter by category name
router.get('/:namenewca', async (req, res) => {
  try {
    const requests = await ReqModel.find({ namenewca: req.params.namenewca });
    if (!requests || requests.length === 0) {
      return res.status(404).json({ ms: 'Request not found!' });
    }
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
