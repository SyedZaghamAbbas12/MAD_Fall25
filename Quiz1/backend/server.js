// 📚 Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🧠 MongoDB Connection (FIXED)
mongoose
  .connect("mongodb+srv://Zagham:8593@zagham.8lz5mgv.mongodb.net/attendance_app")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// 🧩 MongoDB Schemas
const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const StudentSchema = new mongoose.Schema({
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  name: String,
  status: { type: String, default: "Absent" },
});

const Subject = mongoose.model("Subject", SubjectSchema);
const Student = mongoose.model("Student", StudentSchema);

// 🏠 Root
app.get("/", (req, res) => res.send("✅ Attendance backend running with MongoDB!"));

// 📌 Get all subjects
app.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Add new subject
app.post("/subjects", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Subject name required" });

    const subject = new Subject({ name });
    await subject.save();

    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Delete subject
app.delete("/subjects/:id", async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    await Student.deleteMany({ subject_id: req.params.id });

    res.json({ message: "✅ Subject deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Add student
app.post("/subjects/:id/students", async (req, res) => {
  try {
    const { name } = req.body;

    const student = new Student({
      subject_id: req.params.id,
      name,
    });

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Delete student
app.delete("/subjects/:subjectId/students/:studentId", async (req, res) => {
  try {
    await Student.findOneAndDelete({
      _id: req.params.studentId,
      subject_id: req.params.subjectId,
    });

    res.json({ message: "✅ Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Update attendance
app.post("/subjects/:subjectId/attendance/:studentId", async (req, res) => {
  try {
    const { status } = req.body;

    await Student.updateOne(
      {
        _id: req.params.studentId,
        subject_id: req.params.subjectId,
      },
      { status }
    );

    res.json({ message: "✅ Attendance updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get students of subject
app.get("/subjects/:id/students", async (req, res) => {
  try {
    const students = await Student.find({ subject_id: req.params.id });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
