import { AppDataSource } from '../database/data-source';
import { Comment } from '../models/comment';
import { Post } from '../models/post';

export class CommentService {
    async addComment(postId: number, author: string, content: string): Promise<Comment> {
        const postRepository = AppDataSource.getRepository(Post);
        const commentRepository = AppDataSource.getRepository(Comment);

        const post = await postRepository.findOneBy({ id: postId });
        if (!post) throw new Error('Post não encontrado');

        const comment = commentRepository.create({
            author,
            content,
            date: new Date(),
            post,
        });

        return await commentRepository.save(comment);
    }
}