import { Student } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import { faker } from "@faker-js/faker";

const getAllStudents = async ({ page, size, searchString }) => {
    // aggregate data for all students
    const students = await Student.aggregate([
        {
            $match: {
                $or: [
                    { name: { $regex: `.*${searchString}.*`, $options: "i" } }, // ignore case
                    { email: { $regex: `.*${searchString}.*`, $options: "i" } },
                    {
                        address: {
                            $regex: `.*${searchString}.*`,
                            $options: "i"
                        }
                    }
                ]
            }
        },
        { $skip: page * (size - 1) },
        { $limit: Number(size) }
    ]);
    return students;
};

const getStudentDetails = async (studentId) => {
    const student = await Student.findById(studentId);

    if (!student) {
        throw new Exception(`Cannot find student with id: ${studentId}`);
    }

    return student ?? {};
};

const updateStudent = async ({
    id,
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address
}) => {
    const student = await Student.findById(id);
    student.name = name ?? student.name;
    student.email = email ?? student.email;
    student.languages = languages ?? student.languages;
    student.gender = gender ?? student.gender;
    student.phoneNumber = phoneNumber ?? student.phoneNumber;
    student.address = address ?? student.address;

    await student.save();

    return student;
};

const insertStudent = async ({
    name,
    email,
    languages,
    gender,
    phoneNumber,
    address
}) => {
    try {
        const student = await Student.create({
            name,
            email,
            languages,
            gender,
            phoneNumber,
            address
        });

        return student;
    } catch (exception) {
        if (!!exception?.errors) {
            throw new Exception("Input error", exception.errors);
        }
    }
};

const generateStudents = async () => {
    // delete all
    await Student.deleteMany({});

    const students = [];
    [...Array(1000).keys()].forEach(async () => {
        students.push({
            name: `${faker.person.firstName()}-fake`,
            email: faker.internet.email(),
            languages: [
                faker.helpers.arrayElement(["English", "Vietnamese", "French"]),
                faker.helpers.arrayElement(["Korean", "Japanese", "Chinese"])
            ],
            gender: faker.helpers.arrayElement(["Male", "Female"]),
            phoneNumber: faker.phone.imei(),
            address: faker.location.city()
        });
    });

    await Student.insertMany(students);
};

export default {
    getAllStudents,
    getStudentDetails,
    updateStudent,
    insertStudent,
    generateStudents
};
