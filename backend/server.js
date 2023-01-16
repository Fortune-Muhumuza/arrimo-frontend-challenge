const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const eventsController = require("./controllers/events");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://Fort:fortune@cluster0.144qe.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection to database failed!", error);
  });

app.get("/events", eventsController.getEvents);
app.post("/events", eventsController.createEvent);
app.put("/events/:id", eventsController.updateEvent);
// app.delete("/events/:id", eventsController.deleteEvent);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
