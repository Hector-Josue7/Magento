const helpers = {};

helpers.randomNumber = () => {
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomNumber = 0;
  for(let i = 0;i < 6; i++) {
    randomNumber += possible.charAt(Math.floor(Math.random() * possible.length)); // se selecciona un caracter aleatorio que caiga con math.floor que es para redondeos havia abajo
  }
  return randomNumber;
};

module.exports = helpers;
