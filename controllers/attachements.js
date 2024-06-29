const db = require("../config/db");

// Create Attachements

const addattachements = (req, res) => {
  console.log(req.body);

  const { filename, typeoffile, createdby, modifiedby } = req.body;

  const query =
    "INSERT INTO attachments (filename, typeoffile, createdby,modifiedby) VALUES (?, ?,?,?)";
  db.query(
    query,
    [filename, typeoffile, createdby, modifiedby],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
};
// http://localhost:1001/api/addattachements

/* 
{
  "filename":"register folder",
  "typeoffile":"doc",
  "createdby":"pratik",
  "modifiedby":"saqib"
  
}
*/

const getallattachments = (req, res) => {
  console.log(req.body);
  const query = "SELECT * FROM attachments";
  db.query(query, (error, result) => {
    if (error) {
      console.log("Error fetching attachments", error);
      return res.status(500).send({ error: "Error fetching attachments" });
    }
    if (result.length === 0) {
      return res.status(404).send({ error: "No attachmnent found" });
    }
    console.log("Result", result);
    res.json(result);
  });
};
// http://localhost:1001/api/getallattachments

const updateattachments = (req, res) => {
  console.log(req.body);
  const { filename, typeoffile, createdby, modifiedby, attachmentid } =
    req.body;
  if (!attachmentid) {
    return res.status(400).send({ error: "attachmentid is required" });
  }
  const query =
    "UPDATE attachments SET filename = ?,typeoffile = ?,createdby = ?,modifiedby = ? WHERE attachmentid = ?";
  db.query(
    query,
    [filename, typeoffile, createdby, modifiedby, attachmentid],
    (error, result) => {
      if (error) {
        console.error("Error updating ticket:", err);
        return res.status(500).send({ err: "Error updating user" });
      }

      if (result === 0) {
        return res.status(404).send({ err: "ticket not found" });
      }

      res.send({ message: "ticket updated successfully" });
    }
  );
};
// http://localhost:1001/api/updateattachments
/*
{
  "attachmentid":"1",
  "filename":"register folder",
  "typeoffile":"doc",
  "createdby":"prachi",
  "modifiedby":"saqib"
  
} */

const deleteattachments = (req, res) => {
  console.log(req.body);
  const { attachmentid } = req.body;
  if (!attachmentid) {
    return res.status(400).send({ error: "Id required to delete attachments" });
  }
  const query = "DELETE FROM attachments  WHERE attachmentid = ? ";
  db.query(query, [attachmentid], (error, result) => {
    if (error) {
      console.log({ error: "Error deleting attachments" });
      return res.status(500).send({ error: "Error deleting attachments" });
    }
    if (result == 0) {
      return res.status(404).send({ error: "attachments not found" });
    }
    res.send({ message: "attachments deleting sucessfully" });
  });
};
// http://localhost:1001/api/deleteattachments

module.exports = {
  addattachements,
  getallattachments,
  updateattachments,
  deleteattachments,
};
