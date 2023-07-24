const express = require('express');
const cookieParser = require('cookie-parser');
const AuthRoute = require('./Routes/AuthRoute');
const TaskRoute = require('./Routes/TaskRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/auth', AuthRoute);
app.use('/task', TaskRoute);

const port = process.env.PORT
app.listen(port, (err)=> {
    if(err) {
        console.log(err);
    }else {
        console.log(`Listening on port ${port}`);
    }
})

app.get('/', (req, res)=>{
    res.json({
        message: "Server running successfully"
    })
})
