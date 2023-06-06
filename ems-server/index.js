//loads .env file contents into proces.env
require("dotenv").config();
require("./db/connection");
const router = require("./routes/router");

const express = require("express");
const cors = require("cors");
const server = express();
const PORT = 4000 || process.env.PORT;
// export uploads folder to client
server.use("/uploads", express.static("./uploads"));
server.use(cors());
server.use(express.json());
server.use(router);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.get("/", (req, res) => {
  res.send("EMS server running...");
});
