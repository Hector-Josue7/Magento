var mongoose = require("mongoose");
 const { Schema } = mongoose;
 const Joi = require('joi');

//  const commentSchema = new Schema({
 var UserSchema  = new Schema({
  //  _id: Schema.Types.ObjectId,
      nombre : { type: String, required: true },
      apellido : { type: String, required: true },
      usuario :  {type: String, unique: true, trim: true}, //unique: true
      correo : {type: String, unique: true, trim: true,  lowercase: true},
      clave :{type: String, minlength: 5, required: true},
      foto: { type: String, required: false, default: '../public/img/team/ac_generico.jpg' },
      gender:String,
      birthdate:mongoose.SchemaTypes.Mixed, 
      fechaRegistro: {type: Date, default: Date.now},
      // tipoUsuario: { type: String, enum: ['administrador', 'usuario_generico'], required: false, default: 'usuario_generico' },
      tipoUsuario:{type: Schema.Types.ObjectId, ref: 'tipoUsuario', required: false},
      tipoUsuario: {},
      imagenes: Array,
      videos: Array,
      archivosGenericos: Array
    }, { timestamps: true });

var User = mongoose.model('usuario', UserSchema);
module.exports = User;
















