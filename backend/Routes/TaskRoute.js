const express = require('express');
const { GetTasks, Addtask, UpdateTask, DeleteTask } = require('../Controller/TaskControl');

const app = express();

app.use(express.json());

const TaskRoute = express.Router();

TaskRoute
    .route('/')
    .post(Addtask)
    .patch(UpdateTask)
    .delete(DeleteTask)

TaskRoute.get('/:jwt', GetTasks)

module.exports = TaskRoute;