const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const taskSchema = new mongoose.Schema({

    userId: { type: ObjectId, ref: "users", required: true },
    title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("tasks", taskSchema);
