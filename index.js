const express = require("express");
const app = express();

app.get("/users", function (req, res) {
  res.send("Hello world !");
});

app.listen(3000,()=>{
    console.log('App is listening in port 3000...');
})