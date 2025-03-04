import { Schema, model } from "mongoose";

const shoppingCartSchema = Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        products:[
           { 
            product:{
            type: Schema.Types.ObjectId,
            ref: 'Product'
            },
            subtotal:{
            type: Number
            }
        }
        ],
        total:{
            type:Number
        }
    },
    {
        versionKey: false, 
        timestamps: true 
    }
)


export default model('Cart', shoppingCartSchema)