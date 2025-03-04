import { Schema,model } from "mongoose";

const invoiceSchema = Schema(
   {
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref: 'Product'
            }
        }
    ],
    total:{
        type: Number
    },
    status:{
        type: Boolean,
        default: false
    }
  },
  {
    versionKey: false, 
    timestamps: true 
    }
)

export default model('Invoice', invoiceSchema)