const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors")

const port = 3001;
const app = express();
const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");
const connection = require("./database");
app.use(express.json());
app.use(express.static("public"));
app.use(cors())
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);
app.all("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't fint ${req.originalUrl} on this server`,
  });
});

app.listen(port, () => {
  console.log(`example app listen ${port}`);
});
