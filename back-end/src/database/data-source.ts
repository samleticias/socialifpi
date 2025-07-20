import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { Report } from '../models/report';
import { Category } from '../models/category';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres', // troque pelo seu usuário do postgres
    password: 'jotave9474',   // troque pela sua senha do postgres
    database: 'socialifpi',  // troque pelo nome do seu banco
    synchronize: true,       // true só em desenvolvimento!
    logging: false,
    entities: [Post, Comment, Report, Category]
});