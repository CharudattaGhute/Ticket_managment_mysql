const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const routesAPI = require("./routes/api");

const app = express();

// app.get("/", (req, res) => {
//   console.log("hello");
// });

app.use(express.json());
app.use(
  session({ secret: "your_secret_key", resave: true, saveUninitialized: true })
);
app.use(bodyParser.json());

app.use("/api", routesAPI);

app.listen(1001, () => {
  console.log("http://localhost:1001");
});
