const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    studentEmail: { type: String, required: true },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
