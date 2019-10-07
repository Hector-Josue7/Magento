const router = require('express').Router();
const commentValidators = require('../validators/comment.validators');
const authMiddleware = require('../modulos/middleware');
 const postValidators = require('../validators/post.validators');

 const { Comentario, Post } = require('../models');

module.exports =  app => {
   /*==============================
   Obtener comentario por su id
   ==============================*/
router.get('/:id', commentValidators.getCommentById,  async (req, res) => {

      try {

         const comment = await Comentario.findById(req.params.id)
            .populate('user', 'usuario')
            .populate('likedBy', 'usuario')
            .populate('dislikedBy', 'usuario')
            .exec();

         if (!comment) {
            return res.status(404).json({ msg: 'No se ha encontrado comentario con ese ID' });
         }

         res.status(200).json({ comment });

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al obtener el comentario', error: err });
      }

   });
  /*=========================
   Darle like a un Comentario
   =========================*/
   // // Darle like al comentario
 router.post('/:id/like', commentValidators.likeComment, authMiddleware.isAuth, async (req, res) => {

      try {

         const comment = await Comentario.findById(req.params.id).exec();

         if (!comment) {
            return res.status(404).json({ msg: 'No se ha encontrado comentario con ese ID' });
         } else {

            // Espero hasta obtener los ids
            const [userIdFromComment, userIdFromToken] = await Promise.all([comment.user.toString(), req.body.userId]);

            // Valido que no sea un comentario del usuario
            if (userIdFromComment === userIdFromToken) {
               return res.status(403).json({ msg: 'No puedes darle like a tu propio comentario' });
            }

            // Espero hasta crear los arrays con todos los usuarios que ya le dieron like y dislike
            const [usersWhoLike, usersWhoDislike] = await Promise.all([
               comment.likedBy.map(user => user.toString()),
               comment.dislikedBy.map(user => user.toString())
            ]);

            // Valido que no le haya dado like aun
            if (usersWhoLike.indexOf(userIdFromToken) !== -1) {
               return res.status(403).json({ msg: 'Ya le has dado like' });
            }

            // Elimino el dislike del usuario si lo habia dado
            const index = await usersWhoDislike.indexOf(userIdFromToken);

            if (index !== -1) {
               await Promise.all([
                  comment.set({ dislikes: comment.dislikes -= 1 }),
                  comment.dislikedBy.splice(index, 1)
               ]);
            }

            // Espero hasta setear el like en la coleccion
            await Promise.all([
               comment.likedBy.push(userIdFromToken),
               comment.set({ likes: comment.likes += 1 })
            ]);

            // Persisto el like
            const commentLiked = await comment.save();

            res.status(200).json({ msg: 'Has dado like', comment: commentLiked });
         }

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al darle like al comentario', error: err });
      }

   });
  /*===========================
   Darle dislike a un Comentario
   ============================*/
 router.post('/:id/dislike', commentValidators.dislikeComment, authMiddleware.isAuth, async (req, res) => {

      try {

         const comment = await Comentario.findById(req.params.id).exec();

         if (!comment) {
            return res.status(404).json({ msg: 'No se ha encontrado comentario con ese ID' });
         } else {

            // Espero hasta obtener los ids
            const [userIdFromComment, userIdFromToken] = await Promise.all([comment.user.toString(), req.body.userId]);

            // Valido que no sea un comentario del usuario
            if (userIdFromComment === userIdFromToken) {
               return res.status(403).json({ msg: 'No puedes darle dislike a tu propio comentario' });
            }

            // Espero hasta crear los arrays con todos los usuarios que ya le dieron like y dislike
            const [usersWhoLike, usersWhoDislike] = await Promise.all([
               comment.likedBy.map(user => user.toString()),
               comment.dislikedBy.map(user => user.toString())
            ]);

            // Valido que no le haya dado dislike aun
            if (usersWhoDislike.indexOf(userIdFromToken) !== -1) {
               return res.status(403).json({ msg: 'Ya le has dado dislike' });
            }

            // Elimino el like del usuario si lo habia dado
            const index = await usersWhoLike.indexOf(userIdFromToken);

            if (index !== -1) {
               await Promise.all([
                  comment.set({ likes: comment.likes -= 1 }),
                  comment.likedBy.splice(index, 1)
               ]);
            }

            // Espero hasta setear el dislike en la coleccion
            await Promise.all([
               comment.dislikedBy.push(userIdFromToken),
               comment.set({ dislikes: comment.dislikes += 1 })
            ]);

            // Persisto el dislike
            const commentDisliked = await comment.save();

            res.status(200).json({ msg: 'Has dado dislike', comment: commentDisliked });
         }

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al darle dislike al comentario', error: err });
      }

   });
   /*=======================
   Actualizar un comentario
   ========================*/
router.patch('/:id', commentValidators.updateComment, authMiddleware.isAuth, async (req, res) => {

      try {

         const commentToUpdate = await Comentario.findById(req.params.id).exec();

         if (!commentToUpdate) {
            return res.status(404).json({ msg: 'No se ha encontrado comentario con ese ID' });
         } else {

            // Espero hasta obtener los user ids
            const [userIdFromPost, userIdFromToken] = await Promise.all([
               commentToUpdate.user.toString(),
               req.body.userId
            ]);

            // Valido que sea un comentario del usuario
            if (userIdFromPost !== userIdFromToken) {
               return res.status(403).json({ msg: 'No puedes editar un comentario que no has creado' });
            }

            // Espero hasta setear el comentario a actualizar
            commentToUpdate.comment = await req.body.comment;

            // Actualizo el comentario
            const commentUpdated = await commentToUpdate.save();

            // Busco el comentario actualizado para
            // mandarlo en la respuesta con los populate
            const comment = await Comentario.findOne(commentUpdated)
               .populate('user', 'username')
               .populate('likedBy', 'username')
               .populate('dislikedBy', 'username')
               .exec();

            res.status(200).json({ msg: 'Comentario actualizado', comment });
         }

      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al actualizar el comentario', error: err });
      }

   });


      /*=============================
 RUTAS DE POSTS
   ==============================*/

// Todos los posts
router.get('/', async (req, res) => {

   try {
      // Espero hasta q se ejecute la promesa que trae los posts
      const posts = await Post.find()
         .populate('user', 'username')
         .populate('likedBy', 'username')
         .populate('dislikedBy', 'username')
         .populate({
            path: 'comments',
            populate: {
               path: 'user',
               select: 'username'
            }
         })
         .sort({ createdAt: 'asc' })
         .exec()

      res.status(200).json({ total: posts.length, posts });

   } catch (err) {
      console.err(err);
      res.status(500).json({ msg: 'Error al obtener todos los posts', error: err });
   }

});

// Posts por id
router.get('/:id', postValidators.getPostById, async (req, res) => {

   try {
      // Espero hasta que se ejecute la promesa que trae el post
      const post = await Post.findById(req.params.id)
         .populate('user', 'username')
         .populate('likedBy', 'username')
         .populate('dislikedBy', 'username')
         .populate({
            path: 'comments',
            populate: {
               path: 'user',
               select: 'username'
            }
         })
         .exec()

      if (!post) {
         return res.status(404).json({ msg: 'No se ha encontrado post con ese ID' });
      }

      res.status(200).json({ post });

   } catch (err) {
      console.err(err);
      res.status(500).json({ msg: 'Error al obtener el post', error: err });
   }

});

// Crear un nuevo post
router.post('/', postValidators.createPost, authMiddleware.isAuth, async (req, res) => {

   try {
      // Espero hasta crear el nuevo post
      const post = await new Post({
         title: req.body.title,
         body: req.body.body,
         user: req.body.userId
      });

      // Espero hasta guardar el nuevo post
      const newPost = await post.save();

      res.status(201).json({ msg: 'Post creado', post: newPost });

   } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error al guardar el nuevo post', error: err })
   }

});

// Darle like al post
router.post('/:id/like', postValidators.likePost, authMiddleware.isAuth, async (req, res) => {

   try {
      // Espero hasta encontrar (o no) el post
      const post = await Post.findById(req.params.id).exec();

      if (!post) {
         return res.status(404).json({ msg: 'No se ha encontrado post con ese ID' });
      } else {

         // Espero hasta obtener los user ids
         const [userIdFromPost, userIdFromToken] = await Promise.all([
            post.user.toString(),
            req.body.userId
         ]);

         // Valido que no sea un post del usuario
         if (userIdFromPost === userIdFromToken) {
            return res.status(403).json({ msg: 'No puedes darle like a tu propio post' });
         }

         // Espero hasta crear arrays con todos los usuarios que ya le dieron like y dislike
         const [usersWhoLike, usersWhoDislike] = await Promise.all([
            post.likedBy.map(user => user.toString()),
            post.dislikedBy.map(user => user.toString())
         ]);

         // Valido que no le haya dado like aun
         if (usersWhoLike.indexOf(userIdFromToken) !== -1) {
            return res.status(403).json({ msg: 'Ya le has dado like' });
         }

         // Elimino el dislike del usuario si lo habia dado
         const index = await usersWhoDislike.indexOf(userIdFromToken);
         if (index !== -1) {
            await Promise.all([
               post.set({ dislikes: post.dislikes -= 1 }),
               post.dislikedBy.splice(index, 1)
            ]);
         }

         // Espero hasta setear el like
         await Promise.all([
            post.likedBy.push(userIdFromToken),
            post.set({ likes: post.likes += 1 })
         ]);

         // Persisto el like
         const postLiked = await post.save();

         res.status(200).json({ msg: 'Has dado like', post: postLiked });
      }

   } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error al dar like al post', error: err });
   }

});

// Darle dislike al post
router.post('/:id/dislike', postValidators.dislikePost, authMiddleware.isAuth, async (req, res) => {

   try {
      // Espero hasta encontrar (o no) el post
      const post = await Post.findById(req.params.id).exec();

      if (!post) {
         return res.status(404).json({ msg: 'No se ha encontrado post con ese ID' });
      } else {

         // Espero hasta obtener los user ids
         const [userIdFromPost, userIdFromToken] = await Promise.all([
            post.user.toString(),
            req.body.userId
         ]);

         // Valido que no sea un post del usuario
         if (userIdFromPost === userIdFromToken) {
            return res.status(403).json({ msg: 'No puedes darle dislike a tu propio post' });
         }

         // Espero hasta crear arrays con todos los usuarios que ya le dieron like y dislike
         const [usersWhoLike, usersWhoDislike] = await Promise.all([
            post.likedBy.map(user => user.toString()),
            post.dislikedBy.map(user => user.toString())
         ]);

         // Valido que no le haya dado dislike aun
         if (usersWhoDislike.indexOf(userIdFromToken) !== -1) {
            return res.status(403).json({ msg: 'Ya le has dado dislike' });
         }

         // Elimino el like del usuario si lo habia dado
         const index = await usersWhoLike.indexOf(userIdFromToken);
         if (index !== -1) {
            await Promise.all([
               post.set({ likes: post.likes -= 1 }),
               post.likedBy.splice(index, 1)
            ]);
         }

         // Espero hasta setear el dislike
         await Promise.all([
            post.dislikedBy.push(userIdFromToken),
            post.set({ dislikes: post.dislikes += 1 })
         ]);

         // Persisto el dislike
         const postDisliked = await post.save();

         res.status(200).json({ msg: 'Has dado dislike', post: postDisliked });
      }

   } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error al dar dislike al post', error: err });
   }

});


// Actualizar un post
router.patch('/:id', postValidators.updatePost, authMiddleware.isAuth, async (req, res) => {

   try {
      // Espero hasta encontrar (o no) el post         
      const postToUpdate = await Post.findById(req.params.id).exec();

      if (!postToUpdate) {
         return res.status(404).json({ msg: 'No se ha encontrado post con ese ID' });
      } else {

         // Espero hasta obtener los user ids
         const [userIdFromPost, userIdFromToken] = await Promise.all([
            postToUpdate.user.toString(),
            req.body.userId
         ]);

         // Valido que sea un post del usuario
         if (userIdFromPost !== userIdFromToken) {
            return res.status(403).json({ msg: 'No puedes editar un post que no has creado' });
         }

         // Espero hasta setear el post a actualizar
         [postToUpdate.title, postToUpdate.body] = await Promise.all([req.body.title, req.body.body]);

         // Actualizo el post
         const postUpdated = await postToUpdate.save();

         // Busco el post acutalizado para mandarlo en
         // la respuesta con los populate
         const post = await Post.findOne(postUpdated)
            .populate('user', 'username')
            .populate('likedBy', 'username')
            .populate('dislikedBy', 'username')
            .populate({
               path: 'comments',
               populate: {
                  path: 'user',
                  select: 'username'
               }
            })
            .exec()

         res.status(200).json({ msg: 'Post actualizado', post });
      }

   } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error al actualizar el post', error: err });
   }

});

// Eliminar un post
router.delete('/:id', postValidators.deletePost, authMiddleware.isAuth, async (req, res) => {

   try {
      // Espero hasta encontrar (o no) el post         
      const postToDelete = await Post.findById(req.params.id).exec();

      if (!postToDelete) {
         return res.status(404).json({ msg: 'No se ha encontrado post con ese ID' });
      } else {

         // Espero hasta obtener los user ids
         const [userIdFromPost, userIdFromToken] = await Promise.all([
            postToDelete.user.toString(),
            req.body.userId
         ]);

         // Valido que sea un post del usuario
         if (userIdFromPost !== userIdFromToken) {
            return res.status(403).json({ msg: 'No puedes eliminar un post que no has creado' });
         }

         // Espero hasta remover los comentarios del post de su coleccion
         await Comment.remove({ _id: { $in: postToDelete.comments } });

         // Espero hasta eliminar el post
         const postDeleted = await postToDelete.remove();

         res.status(200).json({ msg: 'Post eliminado', postDeleted });
      }

   } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error al eliminar el post', error: err });
   }

});


/*=======================
Rutas de comentarios que
dependen de un post 
========================*/

/*=========================
   Crear comentario en un post
   =========================*/
   router.post('/:id/comment', commentValidators.createComment, authMiddleware.isAuth, async (req, res) => {

      try {
   
         const postToAddComment = await Post.findById(req.params.id).exec();
   
         if (!postToAddComment) {
            return res.status(404).json({ msg: 'No se ha encontrado post con ese ID' });
         } else {
   
            // Espero hasta crear el nuevo comentario
            const newComment = await new Comment({
               user: req.body.userId,
               comment: req.body.comment
            });
   
            // Espero hasta guardar el comentario en su coleccion
            const comment = await newComment.save();
   
            // Espero hasta pushear el comentario en el array del post
            await postToAddComment.comments.push(comment._id);
   
            // Espero hasta guardo el post con el nuevo comentario
            const post = await postToAddComment.save();
   
            res.status(201).json({ msg: 'Comentario creado', post, comment });
         }
   
      } catch (err) {
         console.error(err);
         res.status(500).json({ msg: 'Error al guardar el nuevo comentario', error: err });
      }
   
   });
   
   
   
   /*==============================
      Todos los comentarios de un post
      ==============================*/
      router.get('/:id/comment', commentValidators.getCommentsByPost, async (req, res) => {
   
         try {
   
            const post = await Post.findById(req.params.id)
               .populate({
                  path: 'comments',
                  populate: {
                     path: 'user',
                     select: 'username'
                  }
               })
               .exec();
   
            if (!post) {
               return res.status(404).json({ msg: 'No se ha encontrado post con ese ID' });
            } else {
               res.status(200).json({ comments: post.comments });
            }
   
         } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Error al obtener todos los comentarios', error: err });
         }
   
      });
   
   /*=============================
      Eliminar comentario en un post de la coleccion de comentarios
      ==============================*/
      router.delete('/:postId/comment/:commentId', commentValidators.deleteComment, authMiddleware.isAuth, async (req, res) => {
         try {
      
               const post = await Post.findById(req.params.postId).exec();
      
               if (!post) {
                  return res.status(404).json({ msg: 'No se ha encontrado post con ese ID' });
               } else {
      
                  // Creo array con todos los id de comentarios del post
                  const postComments = await post.comments.map(comment => comment.toString());
      
                  // Valido que el commentId este en el post
                  const index = postComments.indexOf(req.params.commentId);
                  if (index === -1) {
                     return res.status(404).json({ msg: 'No se ha encontrado comentario con ese ID en el post' });
                  } else {
                     // El comentario existe y esta en el post
      
                     // Valido que el usuario sea el que escribio el comentario
                     const comment = await Comentario.findById(req.params.commentId).exec();
      
                     const [userIdFromToken, userIdFromComment] = await Promise.all([
                        req.body.userId,
                        comment.user.toString()
                     ]);
      
                     if (userIdFromToken !== userIdFromComment) {
                        return res.status(403).json({ msg: 'No puedes eliminar un comentario que no has creado' });
                     }
      
                     // Elimino el comentario de su coleccion y del array de comments del post en paralelo
                     await Promise.all([comment.remove(), post.comments.splice(index, 1)]);
      
                     // Guardo el post q se le quito el comentario
                     const postUpdated = await post.save();
      
                     res.status(200).json({ msg: 'Cometario eliminado', post: postUpdated });
                  }
               }
      
            } catch (err) {
               console.error(err);
               res.status(500).json({ msg: 'Error al eliminar el comentario', error: err });
            }
      
         });
   
   app.use(router);
  

}


