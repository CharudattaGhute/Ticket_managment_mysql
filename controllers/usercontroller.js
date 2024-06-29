const db = require("../config/db");

const adduser = (req, res) => {
  console.log(req.body);

  const {
    name,
    email,
    mobile,
    gender,
    age,
    designation,
    type,
    password,
    isDeleted,
    createdBy,
    modifiedBy,
  } = req.body;
  const query =
    "INSERT INTO adduser4 (name, email, mobile,gender,age,designation,type,password,isDeleted,createdBy,modifiedBy) VALUES (?, ?,?,?,?,?,?,?,?,?,?)";

  db.query(
    query,
    [
      name,
      email,
      mobile,
      gender,
      age,
      designation,
      type,
      password,
      isDeleted,
      createdBy,
      modifiedBy,
    ],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
// http://localhost:1001/api/adduser
/* 
{
  "name":"Charudatta Ghute",
  "email":"ghutecharudatta@gmail.com",
  "mobile":"9511225460",
  "gender":"male",
  "age":"21",
  "designation":"Software engineer",
  "type":"End user",
  "password":"charu@123",
  "isDeleted":"0",
  "createdBy":"Charudatta Ghute",
  "modifiedBy":"Saqib patel"
  
}
*/
const getuser = (req, res) => {
  const query = "Select * from adduser4 ";
  db.query(query, (error, result) => {
    if (error) {
      console.log("Error fetching users", error);
      return res.status(500).send({ error: "Error fetching users" });
    }
    if (result.length === 0) {
      return res.status(404).send({ error: "No users found" });
    }
    console.log("Results", result);
    res.json(result);
  });
};
// http://localhost:1001/api/getuser

const updateuser = (req, res) => {
  console.log(req.body);
  const {
    name,
    email,
    mobile,
    gender,
    age,
    designation,
    type,
    password,
    isDeleted,
    createdBy,
    modifiedBy,
    userId,
  } = req.body;
  if (!userId) {
    return res.status(400).send({ error: "User ID is required" });
  }
  const query =
    "UPDATE adduser4 SET name = ?,email = ?,mobile = ?,gender = ?,age = ?,designation = ?,type = ?,password = ?,isDeleted = ?,createdBy = ?,modifiedBy = ? WHERE userId = ?";

  db.query(
    query,
    [
      name,
      email,
      mobile,
      gender,
      age,
      designation,
      type,
      password,
      isDeleted,
      createdBy,
      modifiedBy,
      userId,
    ],
    (err, results) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).send({ error: "Error updating user" });
      }

      if (results === 0) {
        return res.status(404).send({ error: "User not found" });
      }

      res.send({ message: "User updated successfully" });
    }
  );
};
/*{
 "userId":"1",
  "name":"Charudatta Ghute",
  "email":"ghutecharudatta@gmail.com",
  "mobile":"9511225464",
  "gender":"male",
  "age":"20",
  "designation":"Software/frontend engineer",
  "type":"Admin",
  "password":"charudatta@123",
  "isDeleted":"1",
  "createdBy":"Charudatta",
  "modifiedBy":"saqib"
  
} */
// http://localhost:1001/api/updateuser
const deleteuser = (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res
      .status(400)
      .send({ error: "Id and name required to delete user" });
  }
  const query = "DELETE FROM adduser4  WHERE userId = ? AND name = ?";
  db.query(query, [userId, name], (error, result) => {
    if (error) {
      console.log({ error: "Error deleting user" });
      return res.status(500).send({ error: "Error deleting user" });
    }
    if (result == 0) {
      return res.status(404).send({ error: "user not found" });
    }
    res.send({ message: "User deleting sucessfully" });
  });
};
// http://localhost:1001/api/deleteuser

/* 
{
  "userId":2,
  "name":"suraj surywanshi"
}
*/
module.exports = {
  adduser,
  getuser,
  updateuser,
  deleteuser,
};
