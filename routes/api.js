const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/usercontroller");
const ticketcontroller = require("../controllers/ticketcontroller");
const attachmentcontroller = require("../controllers/attachements");
const remarkscontroller = require("../controllers/remark");
const ticketattachmentcontroller = require("../controllers/ticketattachment");
const ticketremarkscontroller = require("../controllers/ticketremarks");

// add user information
router.post("/adduser", usercontroller.adduser);
router.get("/getuser", usercontroller.getuser);
router.put("/updateuser", usercontroller.updateuser);
router.delete("/deleteuser", usercontroller.deleteuser);

// add ticket information
router.post("/createticket", ticketcontroller.createticket);
router.get("/getallticket", ticketcontroller.getallticket);
router.put("/updateticket", ticketcontroller.updateticket);
router.delete("/deleteticket", ticketcontroller.deleteticket);

// add attachment information
router.post("/addattachements", attachmentcontroller.addattachements);
router.get("/getallattachments", attachmentcontroller.getallattachments);
router.put("/updateattachments", attachmentcontroller.updateattachments);
router.delete("/deleteattachments", attachmentcontroller.deleteattachments);

// add reamrk information
router.post("/addremarks", remarkscontroller.addremarks);
router.get("/getallremarks", remarkscontroller.getallremarks);
router.put("/updateremarks", remarkscontroller.updateremarks);
router.delete("/deleteremark", remarkscontroller.deleteremark);

// add ticketattachment information
router.post(
  "/addticketattachment",
  ticketattachmentcontroller.addticketattachment
);
router.get(
  "/getallticketattachment",
  ticketattachmentcontroller.getallticketattachment
);
router.put(
  "/updateticketattachment",
  ticketattachmentcontroller.updateticketattachment
);
router.delete(
  "/deleteticktattachment",
  ticketattachmentcontroller.deleteticktattachment
);

// add ticketremarks information
router.post("/addticketreamrks", ticketremarkscontroller.addticketreamrks);
router.get(
  "/getallticketreamarks",
  ticketremarkscontroller.getallticketreamarks
);
router.put("/updateticketremarks", ticketremarkscontroller.updateticketremarks);
router.delete(
  "/deleteticketremarks",
  ticketremarkscontroller.deleteticketremarks
);
module.exports = router;
