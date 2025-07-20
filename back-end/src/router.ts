import { Router } from 'express';
import { PostController } from './controllers/postController';
import { CommentController } from './controllers/commentController';
import { upload } from './middlewares/upload';

const router = Router();
const postController = new PostController();
const commentController = new CommentController();

// rota para criar um novo post
router.post('/posts', upload.single('image'), (req, res) => postController.create(req, res));

// rota para comentar em um post
router.post('/posts/:postId/comment', (req, res) => commentController.addComment(req, res));

// rota para buscar todos os posts ordenados por like (decrescente)
// também funciona para buscar os posts filtrados por categoria
// ex: /socialifpi/posts/ordered?categoryName=Lazer
router.get('/posts/ordered', (req, res) => postController.listOrdered(req, res));

// rota para obter post por id com comentários ordenados por data (mais recentes primeiro)
router.get('/posts/:postId', (req, res) => postController.getById(req, res));

// rota para curtir um post por id
router.post('/posts/:postId/like', (req, res) => postController.like(req, res));

// rota para deletar um post por id
router.delete('/posts/:postId', (req, res) => postController.delete(req, res));

export default router;