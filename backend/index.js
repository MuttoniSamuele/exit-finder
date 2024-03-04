import express from "express";
import cors from "cors";
import mysql from "mysql";
import bodyParser from "body-parser";

const PORT = 3000;

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

db.connect((err) => {
  if (err) {
    console.log(`Error connecting to database: ${err}`)
    process.exit(1);
  } else {
    console.log("Connected to database");
  }
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (_req, res) => {
  res.status(200).send("Ok");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
