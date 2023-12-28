import express from "express";
import { studentController } from "../controllers/index.js";

const router = express.Router();

router.get("/", studentController.getAllStudents);

router.get("/:id", studentController.getStudentById);

// put: nếu không tìm thấy record để update thì không làm gì cả
// patch: nếu không tìm thấy record để update thì thêm mới
router.patch("/", studentController.updateStudent);

router.post("/insert", studentController.insertStudent);

router.post("/insertFakeStudents", studentController.insertFakeStudents);

export default router;
