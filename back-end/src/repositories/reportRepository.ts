import { AppDataSource } from '../database/data-source';
import { Report } from '../models/report';

export const reportRepository = AppDataSource.getRepository(Report);