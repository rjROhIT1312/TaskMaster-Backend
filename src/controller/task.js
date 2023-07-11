const taskModel = require("../model/taskModel");

const createTask = async (req, res) => {
  try {
    let userId = req.params.userId
    const bodyData = req.body;
    const { title, description, dueDate, status } = bodyData;

    // Check if required fields are provided
    if (!title) {
      return res.status(400).send({ status: false, message: "Title is required" });
    }
    if (!description) {
      return res.status(400).send({ status: false, message: "Description is required" });
    }
    if (!dueDate) {
      return res.status(400).send({ status: false, message: "Due date is required" });
    }
    if (!status) {
      return res.status(400).send({ status: false, message: "Status is required" });
    }

    let allData = {
        userId:userId,
        title:bodyData.title,
        description:bodyData.description,
        dueDate:bodyData.dueDate,
        status:bodyData.status
    }

    const data = await taskModel.create(allData);
    res.status(200).send({ status: true, message: "Task created", data: data});
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getAllTasks = async (req,res) =>{
  let userId = req.params.userId
  if (!userId) {
    return res.status(400).send({ status: false, message: "Please provide userId." });
  }
  const data = await taskModel.find({userId}).select({userId:0,__v:0})

  
  res.status(200).send({status:true,data:data})
}

const updateTask = async (req,res) =>{
  const userId = req.params.userId
  const taskId = req.params.taskId
  const body = req.body
  const {title, description, dueDate, status, assignedUser} = body

  if (!userId) {
    return res.status(400).send({ status: false, message: "Please provide userId." });
  }
  if (!taskId) {
    return res.status(400).send({ status: false, message: "taskId provide userId." });
  }

  const updatedTask = await taskModel.findByIdAndUpdate(
    { _id: taskId },
    { $set: body },
    { new: true }
).select({_id:0,userId:0,__v:0})
return res.status(200).send({ status: true, message: "task updated successfully", data: updatedTask })
}

const deleteTask = async (req,res) =>{
  const userId = req.params.userId
  const taskId = req.params.taskId

  if (!userId) {
    return res.status(400).send({ status: false, message: "Please provide userId." });
  }
  if (!taskId) {
    return res.status(400).send({ status: false, message: "taskId provide userId." });
  }

  const del = await taskModel.findByIdAndDelete(taskId)
  res.status(200).send({status:true, message:"task deleted succesfully"})
}

module.exports = { createTask , getAllTasks, updateTask, deleteTask};
