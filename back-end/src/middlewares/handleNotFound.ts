import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    res.status(404).send('Não encontrado');
}