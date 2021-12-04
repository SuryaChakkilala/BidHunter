const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    reckz: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passwordHash)
}

userSchema.pre('save', async function(next) {
    if(!this.isModified('passwordHash')) {
        next()
    }
    this.passwordHash = await bcrypt.hashSync(this.passwordHash, 10)
})

exports.User = mongoose.model('User', userSchema)