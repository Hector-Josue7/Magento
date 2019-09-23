module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb://localhost:27017/Magento'
  /*si queremos integrar con facebook o twitter la aplicacion, entonces hacemos este codigo
    
    facebook{
        secret:
    }
    */
}