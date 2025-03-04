import { Schema, model } from 'mongoose'

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [35, `Can't be overcome 35 characters`]
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [35 , `Can't be overcome 35 characters`]
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true, 
            lowercase: true,
            maxLength: [20, `Can't be overcome 20 characters`]
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            minLength: [8, `Can't be overcome 8 characters`],
            maxLength: [15, 'Phone must be 15 numbers']
        },
        role: {
            type: String,
            uppercase: true,
            enum: ['ADMIN', 'CLIENT'],
            default: 'CLIENT'
        },
        status:{
            type: Boolean,
            default: true

        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)


userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject() 
    return user
}


export default model('User', userSchema)