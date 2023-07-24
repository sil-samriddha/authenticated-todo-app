const mongoose  = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DBLINK)
.then(function(db){
    console.log('TaskModel -> access granted');
})
.catch(function(err){
    console.log(err);
})


const TaskSchema = mongoose.Schema({
    user_id : {
        type : 'string',
        required : true
    },
    title : {
        type : 'string',
        trim : true,
        required : [true, "Empty Title"]
    },
    description : {
        type : 'string',
        trim : true
    },
    status : {
        type : 'boolean',
        default : false
    }
})


TaskModel = mongoose.model('TaskModel', TaskSchema)

module.exports = TaskModel