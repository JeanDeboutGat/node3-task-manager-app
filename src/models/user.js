const  validator = require('validator')
const mongoose  = require('mongoose')
const  bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

userSchema.methods.toJSON =  function () {
    const user = this 
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject 
    
}
userSchema.methods.generateAuthToken =  async function () {
    const user = this 
    var token = jwt.sign({ _id: user._id.toString()  }, "thisismysecret")
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token 
    
}


userSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({ email });

    if (!user){
        throw new Error("unable to log in")
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch){
        throw Error("unable to log in")

    }

    return user

  };

  

userSchema.pre('save', async function (next){
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})


const User = mongoose.model('User',userSchema)
module.exports = User