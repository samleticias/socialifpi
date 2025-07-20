import { Request, Response } from 'express';
import { ReportService } from '../services/reportService';

const reportService = new ReportService();

export class ReportController {
    async report(req: Request, res: Response) {
        try {
            const postId = Number(req.params.postId);
            const { reason } = req.body;
            
            if (!reason) {
                return res.status(400).json({ message: 'Motivo da denúncia é obrigatório' });
            }

            const message = await reportService.reportPost(postId, reason);
            res.status(200).json({ message });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}