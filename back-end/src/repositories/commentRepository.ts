import { AppDataSource } from '../database/data-source';
import { Comment } from '../models/comment'

export const postRepository = AppDataSource.getRepository(Comment);