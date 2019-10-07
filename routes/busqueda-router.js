const router = require('express').Router();
const { Usuario, Post} = require('../models');

module.exports = app => {
router.get('/',async (req, res) => {
      try {
         const searchTerms = new RegExp(req.query.searchTerms, 'i');
         const [users, posts] = await Promise.all([
            Usuario.find({ usuario: searchTerms }, 'username name lastname email image').exec(),
            Post.find({ title: searchTerms }, 'title user')
               .populate('user', 'username name lastname email image')
               .exec()
         ]);

         res.status(200).json({
            users: { total: users.length, results: users },
            posts: { total: posts.length, results: posts} });

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al buscar', error: err });
      }
});
app.use(router);
}


