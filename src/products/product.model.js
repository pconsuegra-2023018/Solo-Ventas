import { Schema, model } from "mongoose";

const productSchema = Schema(
     {
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        maxLength: [35, `Can't be overcome 35 characters`]
    },
    description: { 
        type: String,
        required: [true, 'Description is required'],
        maxLength: [50, `Can't be overcome 50 characters`]
    },
    category: { 
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: 'Uncategored'
    },
    price: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    sold:{
        type: Number
    }
  },
  {
    versionKey: false, 
    timestamps: true 
  }
)

export default model('Product', productSchema) 