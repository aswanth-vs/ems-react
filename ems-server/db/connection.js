const mongoose = require("mongoose");
const connectionString = process.env.DATABASE;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.log("\nConnection Error:- \n", error, "\n");
  });
