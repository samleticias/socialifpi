import { AppDataSource } from '../database/data-source';
import { Category } from '../models/category'

export const categoryRepository = AppDataSource.getRepository(Category);