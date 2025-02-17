import { Schema,model } from "mongoose";

const categoriaSchema = Schema({
    nombre: { 
        type: String,
        required: true 
    },
    descripcion: { 
        type: String 
    }
  },
  {
    versionKey: false, 
    timestamps: true 
    }
);

export default model('Categoria', categoriaSchema)


  