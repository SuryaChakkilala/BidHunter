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

    const salt = await bcrypt.getSalt(10)
    this.passwordHash = await bcrypt.hashSync(this.passwordHash, salt)
})

exports.User = mongoose.model('User', userSchema)