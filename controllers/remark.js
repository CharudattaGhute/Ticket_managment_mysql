const db = require("../config/db");

// Create Reamrks

const addremarks = (req, res) => {
  console.log(req.body);

  const { userId, text, createdby, modifiedby } = req.body;

  const query =
    "INSERT INTO remarks (userId, text, createdby,modifiedby) VALUES (?, ?,?,?)";
  db.query(query, [userId, text, createdby, modifiedby], (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};
// http://localhost:1001/api/addremarks
/* 
{
  "userId":"1",
  "text":"login pdf",
  "createdby":"prachi",
  "modifiedby":"charudatta ghute"
}
*/

const getallremarks = (req, res) => {
  console.log(req.body);
  const query = "SELECT * FROM remarks";
  db.query(query, (error, result) => {
    if (error) {
      console.log("Error fetching remarks", error);
      return res.status(500).send({ error: "Error fetching remarks" });
    }
    if (result.length === 0) {
      return res.status(404).send({ error: "No remarks found" });
    }
    console.log("Result", result);
    res.json(result);
  });
};
// http://localhost:1001/api/getallremarks

const updateremarks = (req, res) => {
  console.log(req.body);
  const { userId, text, createdby, modifiedby, remarkid } = req.body;
  if (!remarkid) {
    return res.status(400).send({ error: "remarkid is required" });
  }
  const query =
    "UPDATE remarks SET userId = ?,text = ?,createdby = ?,modifiedby = ? WHERE remarkid = ?";
  db.query(
    query,
    [userId, text, createdby, modifiedby, remarkid],
    (error, result) => {
      if (error) {
        console.error("Error updating remark:", err);
        return res.status(500).send({ err: "Error updating remark" });
      }

      if (result === 0) {
        return res.status(404).send({ err: "remark not found" });
      }

      res.send({ message: "remark updated successfully" });
    }
  );
};
// http://localhost:1001/api/updateremarks
/*
{
  "remarkid":"1",
  "userId":"1",
  "text":"login pdf",
  "createdby":"prachi jante",
  "modifiedby":"charudatta ghute"
}
 */

const deleteremark = (req, res) => {
  console.log(req.body);
  const { remarkid } = req.body;
  if (!remarkid) {
    return res
      .status(400)
      .send({ error: "remarkid required to delete remark" });
  }
  const query = "DELETE FROM remarks  WHERE remarkid = ? ";
  db.query(query, [remarkid], (error, result) => {
    if (error) {
      console.log({ error: "Error deleting remark" });
      return res.status(500).send({ error: "Error deleting remark" });
    }
    if (result == 0) {
      return res.status(404).send({ error: "remark not found" });
    }
    res.send({ message: "remark deleting sucessfully" });
  });
};
// http://localhost:1001/api/deleteremark

module.exports = {
  addremarks,
  getallremarks,
  updateremarks,
  deleteremark,
};
