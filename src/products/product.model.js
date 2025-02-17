import { Schema, model } from "mongoose";

const productoSchema = Schema(
     {
    nombre: { 
        type: String, 
        required: true 
    },
    descripcion: { 
        type: String 
    },
    categoria: { 
        type: Schema.Types.ObjectId,
        ref: 'Categoria' 
    },
    precio: { 
        type: Number, 
        required: true 
    },
    cantidadEnStock: { 
        type: Number, 
        required: true 
    }
  },
  {
    versionKey: false, 
    timestamps: true 
  }
);

export default model('Producto', productoSchema) 