const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.DBLINK)
.then(function(db){
    console.log('AuthModel -> access granted');
})
.catch(function(err){
    console.log(err);
})


const AuthSchema = mongoose.Schema({
    name : {
        type : 'string',
        trim : true,
        required : [true, "Empty Name"]
    },
    email : {
        type : 'string',
        trim : true,
        required : [true, "Empty Email"],
        unique : true
    },
    password : {
        type : 'string',
        trim : true,
        required : [true, "Empty Password"]
    },
    otp : {
        type : 'number',
        default : Math.floor(1000 + Math.random() * 9000)
    }
})

AuthSchema.pre('save', async function (next) {
    try {
      if (this.isModified('password') || this.isNew) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      next(error);
    }
  });

AuthSchema.pre('validate', function(next) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.email)){
        next();
    }else {
        next(new Error('Invalid email'));
    }
});

AuthModel = mongoose.model('AuthModel', AuthSchema)

module.exports = AuthModel