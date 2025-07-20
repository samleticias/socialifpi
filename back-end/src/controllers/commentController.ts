import { Request, Response } from 'express';
import { CommentService } from '../services/commentService';

const commentService = new CommentService();

export class CommentController {
    async addComment(req: Request, res: Response) {
        try {
            const postId = Number(req.params.postId);
            const content  = req.body.content;
            const author = "desconhecido";
            const comment = await commentService.addComment(postId, author, content);
            res.status(201).json(comment);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}