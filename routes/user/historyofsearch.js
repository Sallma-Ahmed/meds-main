const router = require("express").Router();
const conn = require("../../db/dbconnection");
const util = require("util"); // helper

// Show the history of search by ID of the user
router.get("/:idfuser", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    const his = await query("SELECT * FROM history WHERE idfuser = ?", [
      req.params.idfuser,
    ]);
    if (!his || his.length === 0) {
      return res.status(404).json({ ms: "History not found!" });
    }
    res.status(200).json(his);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
