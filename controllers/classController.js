const Class = require("../models/class");
const Student = require("../models/student");
const helper = require("../config/helper");

exports.createClass = async (req, res, next) => {
  try {
      const { name } = req.body;
      if (!name) return next(new Error("Name is required"));
      
    const classExists = await Class.findOne({ name });
    if (classExists) return res.status(400).json({
      status: "error",
      message: "Class already exists",
      dataId: classExists._id
    });
    const classData = await Class.create({name});
    res.status(201).json({
      status: "success",
      message: "Class created",
      data: classData,
    });
  } catch (error) {
    next(error);
  }
}

exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find({});
    res.status(200).json({
      status: "success",
      message: "classes retrieved successfully",
      data: classes,
    });
  } catch (error) {
    next(error);
  }
}

exports.getClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new Error("Id is required"));
    const classData = await Class.findById(id);
    if (!classData) return next(new Error("Class not found", 404));
    res.status(200).json({
      status: "success",
      message: "Class found",
      data: classData,
    });
  } catch (error) {
    next(error);
  }
}

exports.updateClass = async (req, res, next) => {
  try {
    const { id } = req.params;
      if (!id) return next(new Error("Id is required"));
      const { name } = req.body;
      if (!name) return next(new Error("Name is required"));
      const classData = await Class.findById(id);
      if (!classData) return next(new Error("Class not found", 404));
      if (classData.name === name) return next(new Error("Class name the same"));
      const data = { name };
    const updatedClass = await Class.findByIdAndUpdate(id, data, { new: true});
    res.status(200).json({
      status: "success",
      message: "Class updated",
      data: updatedClass,
    });
  } catch (error) {
    next(error);
  }
}

exports.deleteClass = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return next(new Error("Id is required"));
        const classData = await Class.findById(id);
        if (!classData) return next(new Error("Class not found", 404));
        await Class.findByIdAndDelete(id);
        const students = await Student.find({ class: id });
        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            await Student.findByIdAndUpdate(student._id, { class: null });
        }
        res.status(200).json({
            status: "success",
            message: "Class deleted",
            data: classData,
        });
    } catch (error) {
        next(error);
    }
}