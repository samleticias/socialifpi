import { Request, Response } from 'express';
import { PostService } from '../services/postService';

const postService = new PostService();

export class PostController {
    async create(req: Request, res: Response) {
        try {
            const { title, content, categoryName } = req.body;
            const imagePath = req.file ? `uploads/${req.file.filename}` : undefined;
            const post = await postService.createPost({ title, content, categoryName}, imagePath);
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar post', error });
        }
    }

    async listOrdered(req: Request, res: Response) {
        try {
            const categoryName = req.query.categoryName as string | undefined;
            const posts = await postService.listPostsOrderedByLikes(categoryName);
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar posts', error });
        }
    }

    async like(req: Request, res: Response) {
        try {
            const postId = Number(req.params.postId);
            const post = await postService.likePost(postId);
            res.json({ likes: post.likes });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }
}