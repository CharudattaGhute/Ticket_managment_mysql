const db = require("../config/db");

// Create ticket
const createticket = (req, res) => {
  console.log(req.body);

  const {
    tickettype,
    status,
    title,
    description,
    duedate,
    attachmentid,
    remarkid,
    userId,
    createdby,
    modifiedby,
  } = req.body;
  const query =
    "INSERT INTO ticketinfo (tickettype, status, title, description, duedate, attachmentid,remarkid,userId,createdby,modifiedby) VALUES (?,?,?,?,?,?,?,?,?,?)";
  db.query(
    query,
    [
      tickettype,
      status,
      title,
      description,
      duedate,
      attachmentid,
      remarkid,
      userId,
      createdby,
      modifiedby,
    ],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
};
// http://localhost:1001/api/createticket

/* 
{
  "tickettype":"login invalid",
  "status":"Pending",
  "title":"Administration",
  "description":"login problem",
  "duedate":"2021-12-07T18:30:00.000+00:00",
  "userId":"1",
  "createdby":"Charudatta",
  "modifiedby":"Saqib"
  
}
*/
//  get all ticket

const getallticket = (req, res) => {
  console.log(req.body);
  const query = "Select * from ticketinfo ";
  db.query(query, (error, result) => {
    if (error) {
      console.log("Error fetching ticket", error);
      return res.status(500).send({ error: "Error fetching ticket" });
    }
    if (result.length === 0) {
      return res.status(404).send({ error: "No ticket found" });
    }
    console.log("Result", result);
    res.json(result);
  });
};
// http://localhost:1001/api/getallticket

const updateticket = (req, res) => {
  console.log(req.body);
  const {
    tickettype,
    status,
    title,
    description,
    duedate,
    attachmentid,
    remarkid,
    userId,
    createdby,
    modifiedby,
    tickettId,
  } = req.body;
  if (!tickettId) {
    res.status(400).send({ error: "ticketId is required" });
  }
  const query =
    "UPDATE ticketinfo SET tickettype = ?,status = ?,title = ?,description = ?,duedate = ?,attachmentid = ?,remarkid = ?,userId = ?,createdby = ?,modifiedBy = ? WHERE tickettId = ?";
  db.query(
    query,
    [
      tickettype,
      status,
      title,
      description,
      duedate,
      attachmentid,
      remarkid,
      userId,
      createdby,
      modifiedby,
      tickettId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating ticket:", err);
        res.status(500).send({ error: "Error updating user" });
      }

      if (result === 0) {
        console.log(result);
        res.status(404).send({ error: "ticket not found" });
      }

      console.log("update");
      res.send({ message: "ticket updated successfully" });
    }
  );
};
// http://localhost:1001/api/updateticket
/* 
{
  "tickettId":"2",
  "tickettype":"login/register invalid",
  "status":"Pending/Accepting",
  "title":"Administration/wimdows",
  "description":"login/register problem",
  "duedate":"2024-12-11T18:30:00.000+00:00",
  "userId":"1",
  "createdby":"Charudatta",
  "modifiedby":"Saqib patel"
  
}
*/

const deleteticket = (req, res) => {
  const { tickettId } = req.body;

  if (!tickettId) {
    return res.status(400).send({ error: "Id required to delete user" });
  }
  const query = "DELETE FROM ticketinfo  WHERE tickettId = ?";
  db.query(query, [tickettId], (error, result) => {
    if (error) {
      console.log({ error: "Error deleting user" });
      return res.status(500).send({ error: "Error deleting ticket" });
    }
    if (result == 0) {
      return res.status(404).send({ error: "ticket not found" });
    }
    res.send({ message: "ticket deleting sucessfully" });
  });
};
// http://localhost:1001/api/deleteticket

module.exports = {
  createticket,
  getallticket,
  updateticket,
  deleteticket,
};

// "UPDATE ticketinfo SET tickettype = ?,status = ?,title = ?,description = ?,duedate = ?,attachmentid = ?,remarkid = ?,userId = ?,createdby = ?,createdBy = ?,modifiedBy = ?,modifiedby=? WHERE tickettId = ?";
