import express, { NextFunction, Request, Response } from 'express';
import { notFoundHandler } from './middlewares/handleNotFound';
import { AppDataSource } from './database/data-source';
import router from './router';
import cors from 'cors';

const app = express();

// inicializando a comunicação com o banco de dados
AppDataSource.initialize()
    .then(() => {
        console.log('Banco conectado!');
        // Aqui você pode iniciar o Express normalmente
    })
    .catch((err) => {
        console.error('Erro ao conectar no banco:', err);
});

// Configurações do Express para entender JSON no corpo das requisições
app.use(express.json());

import path from 'path';

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// Configurando as rotas do servidor
app.use('/socialifpi', router);

// Configuração básica do CORS para permitir requisições de outras origens
app.use(cors());

// Inicializar o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando -> http://localhost:${PORT}`);
});

app.use(notFoundHandler);