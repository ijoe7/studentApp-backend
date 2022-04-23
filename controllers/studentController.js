const Student = require("../models/student");
const Class = require("../models/class");
const helper = require("../config/helper");

exports.addStudent = async (req, res, next) => {
    try {
        let request = ["firstName", "lastName", "gender", "age"];
        const data = helper.validateParams(req, next, request);
        // Check if data exists in database
        const studentExists = await Student.findOne(data);
        if (studentExists) return res.status(400).json({
            status: "error",
            message: "Student already exists",
            dataId: studentExists._id
        });
        // Add Class Id if available
        const { classId } = req.body;
        if (classId) {
            data.class = classId;
        }
        const student = await Student.create(data)
        res.status(201).json({
            status: "success",
            message: "Student created",
            data: student,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find({}).populate("class");
        res.status(200).json({
            status: "success",
            message: "students retrieved successfully",
            data: students,
        });
    } catch (error) {
        next(error);
    }
};


exports.getStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error("Id is required"));
        const student = await Student.findById(id).populate("class");
        if (!student) return next(new Error("Student not found", 404));
        res.status(200).json({
            status: "success",
            message: "Student found",
            data: student,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error("Id is required"));
        const { firstName, lastName, gender, age, classId} = req.body;
        const student = await Student.findById(id).select("+password");
        if (!student) return next(new Error("Student not found", 404));
        let data = {
            firstName: firstName || student.firstName,
            lastName: lastName || student.lastName,
            gender: gender || student.gender,
            age: age || student.age
            
        };
        if (classId) {
            const classExists = await Class.findById(classId);
            if (!classExists) return next(new Error("Class not found", 404));
            data.class = classId;
        };
        const updatedStudent = await Student.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({
            status: "success",
            message: "Student updated",
            data: updatedStudent,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error("Id is required"));
        const student = await Student.findById(id);
        if (!student) return next(new Error("Student not found", 404));
        await Student.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            message: "Student deleted",
        });
    } catch (error) {
        next(error);
    }
};

exports.getStudentsInClass = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error("Id is required"));
        const classExists = await Class.findById(id);
        if (!classExists) return next(new Error("Class not found", 404));
        const students = await Student.find({ class: id });
        res.status(200).json({
            status: "success",
            message: "Students retrieved successfully",
            data: students,
        });
    } catch (error) {
        next(error);
    }
}

exports.removeStudentInClass = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error("Id is required"));
        const student = await Student.findById(id);
        if (!student) return next(new Error("Student not found", 404));
        if (!student.class) return next(new Error("Student is not in a class", 404));
        const updateStudent = await Student.findByIdAndUpdate(id, { class: null }, { new: true });
        res.status(200).json({
            status: "success",
            message: "Student deleted",
            data: updateStudent
        });
    } catch (error) {
        next(error);
    }
}