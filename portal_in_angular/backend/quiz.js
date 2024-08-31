const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/quiz")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const StudentSchema = new mongoose.Schema({
  name: { type: String},
  rollno: { type: String},
  age: { type: String},
  batch: { type: String},
});

const Student = mongoose.model("Student", StudentSchema);

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find({ age: "21", "batch": "IT" });
    console.log("Students found:", students); // Debug statement
    res.status(200).json({ students });
  } catch (err) {
    console.error("Error fetching students:", err); // Debug statement
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/all-students", async (req, res) => {
  try {
    const students = await Student.find({});
    console.log("All students:", students); // Debug statement
    res.status(200).json({ students });
  } catch (err) {
    console.error("Error fetching all students:", err); // Debug statement
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/students", async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      rollno: req.body.rollno,
      age: req.body.age,
      batch: req.body.batch,
    });
    await student.save();
    res.status(201).json({ message: "Student created", student });
  } catch (err) {
    console.error("Error creating student:", err); // Debug statement
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
