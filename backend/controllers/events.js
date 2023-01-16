const Event = require("../models/events");

exports.getEvents = (req, res, next) => {
  Event.find()
    .then((events) => {
      res.status(200).json({
        message: "Events fetched successfully!",
        events: events,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching events failed!",
      });
    });
};

exports.createEvent = (req, res, next) => {
  const event = new Event({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
  });
  event
    .save()
    .then((createdEvent) => {
      res.status(201).json({
        message: "Event added successfully",
        event: {
          ...createdEvent,
          id: createdEvent._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating an event failed!",
      });
    });
};

exports.updateEvent = (req, res, next) => {
  const event = new Event({
    _id: req.body.id,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
  });
  Event.updateOne({ _id: req.params.id }, event)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update event!",
      });
    });
};
