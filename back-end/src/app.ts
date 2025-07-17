import express, { NextFunction, Request, Response } from 'express';
import { PostRepository } from './repositories/postRepository';
import { notFoundHandler } from './middlewares/handleNotFound';
import { Post } from './models/post';
import cors from 'cors';

const app = express();
const repository = new PostRepository();

// Configurações do Express para entender JSON no corpo das requisições
app.use(express.json());

// Configuração básica do CORS para permitir requisições de outras origens
app.use(cors());

// Popular o repositório com postagens iniciais
repository.populate();

// Endpoints base
const PATH: string = '/socialifpi/posts';
const PATH_ID: string = PATH + '/:id';
const PATH_LIKE = PATH_ID + '/like';

// Endpoint para listar todas as postagens
app.get(PATH, (req: Request, res: Response) => {
    const posts = repository.list();
    res.json(posts);
});

// Endpoint para consultar uma postagem pelo ID
app.get(PATH_ID, (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const post = repository.findById(id);
    
    if (!post) {
        res.status(404).json({ message: 'Post não encontrado' });
        return;
    } 

    res.json(post);
});

// Endpoint para adicionar uma nova postagem
app.post(PATH, (req: Request, res: Response) => {
    const { title, content, date, likes } = req.body;
    const newPost = new Post(0, title, content, new Date(date), likes || 0);
    const addedPost = repository.add(newPost);
    res.status(201).json(addedPost);
});

// Endpoint para alterar uma postagem existente
app.put(PATH_ID, (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, content, date, likes } = req.body;
    
    const success = repository.update(id, title, content, new Date(date), likes);
    if (!success) {
        res.status(404).json({ message: 'Post não encontrado' });
        return;
    }

    res.status(200).json({ message: 'Post alterado com sucesso' });
});

// Endpoint para excluir uma postagem pelo ID
app.delete(PATH_ID, (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const success = repository.delete(id);
    if (!success) {
        res.status(404).json({ message: 'Post não encontrado' });
        return;
    }

    res.status(200).json({ message: 'Post excluído com sucesso' });
});

// Endpoint para curtir uma postagem pelo ID e retornar a quantidade de curtidas
app.post(PATH_LIKE, (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const likes = repository.like(id);
    
    if (likes == null) {
        res.status(404).json({ message: 'Post não encontrado' });
        return;
    } 
    
    res.json({ message: 'Post curtido com sucesso', likes });
});

// Inicializar o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(notFoundHandler);