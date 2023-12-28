import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { MAX_RECORDS } from "../global/constants.js";
import { studentRepository } from "../repositories/index.js";

async function getAllStudents(req, res) {
    // http://localhost:3002?page=1?size=10
    let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
    size = size > MAX_RECORDS ? MAX_RECORDS : size;

    try {
        const students = await studentRepository.getAllStudents({
            page,
            size,
            searchString
        });

        res.status(HttpStatusCode.OK).json({
            message: "Get all students successfully",
            size,
            page,
            searchString,
            total: students.length,
            data: students
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Cannot get students: " + exception.toString()
        });
    }
}

async function getStudentById(req, res) {
    const studentId = req.params.id;
    try {
        const student = await studentRepository.getStudentDetails(studentId);

        res.status(HttpStatusCode.OK).json({
            message: "Get student details successfully",
            data: student
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Cannot get student by id: " + error.toString()
        });
    }
}

async function updateStudent(req, res) {
    const {
        id,
        name,
        email,
        languages,
        gender,
        phoneNumber,
        address,
    } = req.body;

    try {
        const student = await studentRepository.updateStudent({
            id,
            name,
            email,
            languages,
            gender,
            phoneNumber,
            address,
        });

        res.status(HttpStatusCode.OK).json({
            message: "Update student successfully",
            data: student
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Cannot update student: " + error.toString()
        });
    }
}

async function insertStudent(req, res) {
    try {
        const student = await studentRepository.insertStudent(req.body);
        
        res.status(HttpStatusCode.INSERT_OK).json({
            message: "Insert student successfully",
            data: student
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Cannot insert student: " + error.toString(),
            errors: error.validationErrors
        });
    }
}

async function insertFakeStudents(req, res) {
    await studentRepository.generateStudents();

    res.status(HttpStatusCode.INSERT_OK).json({
        message: "Insert fake students successfully"
    });
}

export default {
    getAllStudents,
    getStudentById,
    updateStudent,
    insertStudent,
    insertFakeStudents
}