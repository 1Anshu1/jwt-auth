import { model, Schema } from "mongoose";
import jwt from 'jsonwebtoken'
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            minLength: [5, 'name must be atleast 5 char'],
            maxLength: [50, 'name must be less than 50 char'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            select: false,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        },
        avatar: {
            type: String,
        },
    },
    {timestamps: true}
)

userSchema.methods = {
    jwtToken() {
        return jwt.sign(
            {id: this.id, email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}


const User = model('User', userSchema)
export default User