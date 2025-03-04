import { Schema,model } from "mongoose";

const categorySchema = Schema({
    name: { 
        type: String,
        required: [true, 'Name is required'],
        maxLength: [30, `Can't be overcome 30 characters`],
        unique: true
    },
    description: { 
        type: String,
        required: [true, 'Name is required'],
        maxLength: [50, `Can't be overcome 50 characters`]
    }
  },
  {
    versionKey: false, 
    timestamps: true 
    }
)

export default model('Category', categorySchema)


  