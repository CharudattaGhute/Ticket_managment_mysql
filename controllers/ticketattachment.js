const db = require("../config/db");

// Create Reamrks

const addticketattachment = (req, res) => {
  console.log(req.body);

  const { tickettId, attachmentid, createdby, modifiedby } = req.body;

  const query =
    "INSERT INTO ticketattachment (tickettId, attachmentid, createdby,modifiedby) VALUES (?, ?,?,?)";
  db.query(
    query,
    [tickettId, attachmentid, createdby, modifiedby],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
};
// http://localhost:1001/api/addticketattachment
/* 
{
  "tickettId":"3",
  "attachmentid":"2",
  "createdby":"pratik",
  "modifiedby":"shravni"
  
}
*/

const getallticketattachment = (req, res) => {
  console.log(req.body);
  const query = "SELECT * FROM ticketattachment";
  db.query(query, (error, result) => {
    if (error) {
      console.log("Error fetching ticketattachment", error);
      return res.status(500).send({ error: "Error fetching ticketattachment" });
    }
    if (result.length === 0) {
      return res.status(404).send({ error: "No ticketattachment found" });
    }
    console.log("Result", result);
    res.json(result);
  });
};
// http://localhost:1001/api/getallticketattachment

const updateticketattachment = (req, res) => {
  console.log(req.body);
  const { tickettId, attachmentid, createdby, modifiedby, ticketattachmentid } =
    req.body;
  if (!ticketattachmentid) {
    return res.status(400).send({ error: "remarkid is required" });
  }
  const query =
    "UPDATE ticketattachment SET tickettId = ?,attachmentid = ?,createdby = ?,modifiedby = ? WHERE ticketattachmentid = ?";
  db.query(
    query,
    [tickettId, attachmentid, createdby, modifiedby, ticketattachmentid],
    (error, result) => {
      if (error) {
        console.error("Error updating ticketattachment:", err);
        return res.status(500).send({ err: "Error updating ticketattachment" });
      }

      if (result === 0) {
        return res.status(404).send({ err: "ticketattachment not found" });
      }

      res.send({ message: "ticketattachment updated successfully" });
    }
  );
};
// http://localhost:1001/api/updateticketattachment
/* 
{
  "ticketattachmentid":"1",
  "tickettId":"3",
  "attachmentid":"2",
  "createdby":"pratik gaikwad",
  "modifiedby":"shravni"
  
}
*/

const deleteticktattachment = (req, res) => {
  console.log(req.body);
  const { ticketattachmentid } = req.body;
  if (!ticketattachmentid) {
    return res.status(400).send({
      error: "ticketattachmentid required to delete ticketattachment",
    });
  }
  const query = "DELETE FROM ticketattachment  WHERE ticketattachmentid = ? ";
  db.query(query, [ticketattachmentid], (error, result) => {
    if (error) {
      console.log({ error: "Error deleting ticketattachment" });
      return res.status(500).send({ error: "Error deleting ticketattachment" });
    }
    if (result == 0) {
      return res.status(404).send({ error: "ticketattachment not found" });
    }
    res.send({ message: "ticketattachment deleting sucessfully" });
  });
};
// http://localhost:1001/api/deleteticktattachment

module.exports = {
  addticketattachment,
  getallticketattachment,
  updateticketattachment,
  deleteticktattachment,
};
