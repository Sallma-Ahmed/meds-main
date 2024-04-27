const router = require('express').Router();
const ReqModel = require('../../models/reqModel');
const authorized = require('../../middleware/authorize');
const admin = require('../../middleware/admin');

router.get('/:nameuser', authorized, async (req, res) => {
  try {
    const user = await ReqModel.find({ nameofuser: req.params.nameuser });

    if (!user.length) {
      return res.status(404).json({ msg: 'User not found!' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
