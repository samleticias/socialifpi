import { AppDataSource } from '../database/data-source';
import { Post } from '../models/post';

export const postRepository = AppDataSource.getRepository(Post);