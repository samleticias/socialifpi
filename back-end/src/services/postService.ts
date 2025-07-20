import { postRepository } from '../repositories/postRepository';
import { categoryRepository } from '../repositories/categoryRepository';
import { Post } from '../models/post';
import { CreatePostDTO } from '../models/dto/postDTOS';
import { Category } from '../models/category';

export class PostService {
    async createPost(data: CreatePostDTO, imagePath?: string): Promise<Post> {

        // buscando pela categoria
        const category = await categoryRepository.findOneBy({ name: data.categoryName });
        if (!category) throw new Error('Categoria não encontrada');

        const post = postRepository.create({
            ...data,
            imagePath: imagePath || null,
            date: new Date(),
            likes: 0,
            category
        });
        return await postRepository.save(post);
    }

    async listPostsOrderedByLikes(categoryName?: string) {
        const where = categoryName
            ? { category: { name: categoryName } }
            : {};
        const posts = await postRepository.find({
            where,
            relations: ['comments', 'reports', 'category'],
            order: { likes: 'DESC' }
        });

        return posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            imagePath: post.imagePath,
            likes: post.likes,
            qtdComments: post.comments ? post.comments.length : 0,
            qtdReports: post.reports ? post.reports.length : 0,
            category: post.category?.name
        }));
    }

    async likePost(postId: number) {
        const post = await postRepository.findOneBy({ id: postId });
        if (!post) throw new Error('Post não encontrado');
        post.likes += 1;
        return await postRepository.save(post);
    }

    async deletePost(postId: number): Promise<void> {
        const post = await postRepository.findOneBy({ id: postId });
        if (!post) {
            throw new Error('Post não encontrado');
        }
        await postRepository.remove(post);
    }

}