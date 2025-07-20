import { reportRepository } from '../repositories/reportRepository';
import { postRepository } from '../repositories/postRepository';
import { Report } from '../models/report';

export class ReportService {
    async reportPost(postId: number, reason: string): Promise<string> {
        // busca o post pelo id, incluindo as denúncias já existentes
        const post = await postRepository.findOne({
            where: { id: postId },
            relations: ['reports'],
        });

        if (!post) throw new Error('Post not found');

        // cria uma nova denúncia associada ao post
        const report = reportRepository.create({
            reason,
            date: new Date(), 
            post,
        });

        await reportRepository.save(report);

        // conta o total de denúncias, incluindo a que acabou de ser criada
        const totalReports = post.reports.length + 1;

        // se o número de denúncias for igual ou maior que 5, o post é removido
        if (totalReports >= 5) {
            await postRepository.remove(post);
            return 'Post excluído devido a múltiplas denúncias'; 
        }

        return 'Post denunciado com sucesso';
    }
}
