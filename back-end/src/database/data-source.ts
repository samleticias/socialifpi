import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { Report } from '../models/report';
import { Category } from '../models/category';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'dpg-d1ujk67diees73aqt4hg-a.oregon-postgres.render.com',
    port: 5432,
    username: 'socialifpi_user', // troque pelo seu usuário do postgres
    password: 'rjephsXK40wLN2DA2gBaGRvwIV0GQVvC',   // troque pela sua senha do postgres
    database: 'socialifpi',  // troque pelo nome do seu banco
    synchronize: true,       // true só em desenvolvimento!
    logging: false,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false, // necessário para o Render
        },
    },
    entities: [Post, Comment, Report, Category]
});