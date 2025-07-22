# SocialIFPI

Sistema de blog desenvolvido como trabalho final da disciplina Programação para a Internet I (Curso ADS - IFPI), utilizando **Node.js com Express** no back-end e persistência com **TypeORM** e banco de dados.

## Funcionalidades Implementadas

### Funcionalidades obrigatórias:

-  Persistência em banco de dados com TypeORM e PostgreSQL.
-  Comentários em postagens, com relação OneToMany.
-  Exclusão de postagens por ID, com confirmação e remoção em cascata de comentários e denúncias.
-  Listagem de comentários por post, ordenados por data decrescente.
-  Back-end desenvolvido com Express.

### Funcionalidades adicionais:

-  *Denúncia de postagens* com motivo:
  - Ao atingir 5 denúncias, o post é automaticamente excluído.
-  Sistema de curtidas para postagens, incrementando um contador de likes.
-  Filtragem de postagens por categoria, ordenadas por número de curtidas.
-  Upload de imagens para postagens com multer.
-  Registro de data de criação de posts e comentários.

## Tecnologias Utilizadas

- Node.js + Express – Framework backend
- TypeORM – ORM para banco relacional
- PostgreSQL – Banco de dados
- Multer – Upload de arquivos
- TypeScript – Tipagem estática
- HTML/CSS/JS – Front-end 

## Equipe de Desenvolvimento

Este projeto foi desenvolvido por:

- **[Enzo Melo](https://github.com/EnzoMello)**  
- **[Kaio Gabriel](https://github.com/KaioGabriel-the)**  
- **[João Victor](https://github.com/victordev018)**  
- **[Sâmmya Leticia](https://github.com/samleticias)**

- Link para o vídeo no Youtube: https://youtu.be/zlBnx5_w9rY 
- Link para o vídeo no Youtube: https://youtu.be/zVQma_0W7GM?si=ufVDyZ495QW055uP
