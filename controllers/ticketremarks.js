const db = require("../config/db");

// Create Reamrks

const addticketreamrks = (req, res) => {
  console.log(req.body);

  const { tickettId, remarkid, createdby, modifiedby } = req.body;

  const query =
    "INSERT INTO ticketremarks (tickettId, remarkid, createdby,modifiedby) VALUES (?, ?,?,?)";
  db.query(
    query,
    [tickettId, remarkid, createdby, modifiedby],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
};
// http://localhost:1001/api/addticketreamrks

/*
{
  "tickettId":"3",
  "remarkid":"2",
  "createdby":"vaishnavi",
  "modifiedby":"prachi"
  
  
}
 */

const getallticketreamarks = (req, res) => {
  console.log(req.body);
  const query = "SELECT * FROM ticketremarks";
  db.query(query, (error, result) => {
    if (error) {
      console.log("Error fetching ticketremarks", error);
      return res.status(500).send({ error: "Error fetching ticketremarks" });
    }
    if (result.length === 0) {
      return res.status(404).send({ error: "No ticketremarks found" });
    }
    console.log("Result", result);
    res.json(result);
  });
};
// http://localhost:1001/api/getallticketreamarks

const updateticketremarks = (req, res) => {
  console.log(req.body);
  const { tickettId, remarkid, createdby, modifiedby, ticketreamrksid } =
    req.body;
  if (!ticketreamrksid) {
    return res.status(400).send({ error: "remarkid is required" });
  }
  const query =
    "UPDATE ticketremarks SET tickettId = ?,remarkid = ?,createdby = ?,modifiedby = ? WHERE ticketreamrksid = ?";
  db.query(
    query,
    [tickettId, remarkid, createdby, modifiedby, ticketreamrksid],
    (error, result) => {
      if (error) {
        console.error("Error updating ticketremarks:", err);
        return res.status(500).send({ err: "Error updating ticketremarks" });
      }

      if (result === 0) {
        return res.status(404).send({ err: "ticketremarks not found" });
      }

      res.send({ message: "ticketremarks updated successfully" });
    }
  );
};
// http://localhost:1001/api/updateticketremarks
/*
{
    "ticketreamrksid":"1",
  "tickettId":"3",
  "remarkid":"2",
  "createdby":"vaishnavi",
  "modifiedby":"prachi"
  
  
}

 */

const deleteticketremarks = (req, res) => {
  console.log(req.body);
  const { ticketreamrksid } = req.body;
  if (!ticketreamrksid) {
    return res.status(400).send({
      error: "ticketreamrksid required to delete ticketremarks",
    });
  }
  const query = "DELETE FROM ticketremarks  WHERE ticketreamrksid = ? ";
  db.query(query, [ticketreamrksid], (error, result) => {
    if (error) {
      console.log({ error: "Error deleting ticketremarks" });
      return res.status(500).send({ error: "Error deleting ticketremarks" });
    }
    if (result == 0) {
      return res.status(404).send({ error: "ticketremarks not found" });
    }
    res.send({ message: "ticketremarks deleting sucessfully" });
  });
};
// http://localhost:1001/api/deleteticketremarks

module.exports = {
  addticketreamrks,
  getallticketreamarks,
  updateticketremarks,
  deleteticketremarks,
};
