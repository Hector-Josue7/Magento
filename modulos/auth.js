// function verificarAutenticacion(req, res, next){
// 	if(req.session.correoUsuario)
// 		return next();
// 	else
// 		res.send("ERROR, ACCESO NO AUTORIZADO");
// }

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
//   req.flash('error_msg', 'Not Authorized.');
console.log("no esta autorizado para ver este contenido")
  res.redirect('/usuarios/login');
};

module.exports = helpers;
