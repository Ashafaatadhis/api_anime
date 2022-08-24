const express = require("express");
const app = express();
const routes = require("./routes/route");

app.use(routes);

app.listen(5050, () => {
  console.log("Server running on port 5050");
});
