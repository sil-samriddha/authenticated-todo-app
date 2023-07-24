const TaskModel = require('../Models/TaskModel');
const AuthModel = require('../Models/AuthModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = process.env.SALT

async function DeleteTask (req, res) {
    try{
        let task = await TaskModel.findOneAndDelete({_id : req.body.task_id});
        console.log("[Task Deleted]", {task_id : task['_id'].toString()});
        res.json({
            success: true,
            message: "Task deleted"
        });
    }catch(err){
        res.json({
            success: false,
            message: err.message
        })
    }
}

async function GetTasks(req, res) {
    if(req.params.jwt){
        try{
            let token = jwt.verify(req.params.jwt, secret_key);
            let user = await AuthModel.findOne({_id : token.payload});
            let u_task = await TaskModel.find({user_id : user['_id'], status : false});
            let c_task = await TaskModel.find({user_id : user['_id'], status : true});
            console.log('[Task Distributed]', user['_id'].toString(), new Date());
            res.json({
                    success: true,
                    message : "Task Loaded successfully",
                    user : user,
                    upcoming_task : u_task,
                    completed_task : c_task
                })
        }catch (err) {
            res.json ({
                success : false,
                message : err.message
            })
        }
    }else{
        res.json({
            success : false,
            message : "empty field"
        })
    }
}

async function Addtask(req, res) {
    try{
        let task = await TaskModel.create(req.body);
        console.log('[Task Created]', { user_id : req.body.user_id, task_id : task['_id'].toString() });
        res.json({
            success : true,
            message : "Task created"
        });
    }catch(err){
        res.json({
            success : false,
            message : err.message
        })
    }
    
}

async function UpdateTask (req, res) {
    try{
        let task = await TaskModel.findOneAndUpdate({_id : req.body.task_id}, {status : true});
        console.log("[Task Updated]", {task_id :  task['_id'].toString()});
        res.json({
            success: true,
            message : "Task updated"
        })
    }catch(err){
        res.json({
            success: false,
            message : err.message
        })
    }
}

module.exports = {
    GetTasks,
    Addtask,
    UpdateTask,
    DeleteTask 
}