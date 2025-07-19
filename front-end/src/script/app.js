"use strict";

// Funções antigas da API (deixadas de lado por enquanto)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getById(id) {
    return document.getElementById(id);
}
const apiUrl = 'http://localhost:3000/socialifpi/postagem'; 
function curtirPostagem(id, curtidasElement) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${apiUrl}/${id}/curtir`, {
            method: 'POST'
        });
        const result = yield response.json();
        curtidasElement.textContent = `Curtidas: ${result.curtidas}`;
    });
}
function incluirPostagem() {
    return __awaiter(this, void 0, void 0, function* () {
        const tituloInput = getById('titulo');
        const conteudoInput = getById('conteudo');
        if (tituloInput && conteudoInput) {
            const novaPostagem = {
                titulo: tituloInput.value,
                conteudo: conteudoInput.value,
                data: new Date().toISOString(),
                curtidas: 0
            };
            const response = yield fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaPostagem)
            });
            const postagemIncluida = yield response.json();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {

    let postsSimulados = [
        { id: 1, imageSrc: 'src/assets/images/post1.png', likes: 15, comments: [{ user: 'aluno1', text: 'Que legal!' }], category: 'tecnologia' },
        { id: 2, imageSrc: 'src/assets/images/post2.jpg', likes: 32, comments: [{ user: 'professor_ely', text: 'Parabéns!' }], category: 'educacao' },
        { id: 3, imageSrc: 'src/assets/images/post3.jpg', likes: 50, comments: [{ user: 'aluno_ads', text: 'Muito bom!' }], category: 'esporte' },
        { id: 4, imageSrc: 'src/assets/images/post4.jpg', likes: 120, comments: [], category: 'lazer' },
        { id: 5, imageSrc: 'src/assets/images/post5.jpg', likes: 8, comments: [{ user: 'calouro', text: 'Cheguei!' }], category: 'tecnologia' },
        { id: 6, imageSrc: 'src/assets/images/post6.jpg', likes: 99, comments: [{ user: 'veterano', text: 'Bem-vindos!' }], category: 'esporte' },
    ];

    const containerDaGrade = document.getElementById('postagens-grid');
    const modalDeDetalhes = document.getElementById('post-detail-modal');
    const botaoFecharModal = document.querySelector('.close-modal-btn');
    const formularioComentario = document.getElementById('comment-form');
    const botaoExibirFiltros = document.getElementById('btn-exibir-filtros');
    const containerOpcoesFiltro = document.getElementById('opcoes-filtro');
    const botoesDeCategoria = document.querySelectorAll('.btn-categoria');

    // Filtra e exibe os posts na tela em formato de grade.
     
    function renderizarPostsNaGrade(categoriaFiltro = 'todos') {
        if (!containerDaGrade) return;

        const postsParaExibir = categoriaFiltro === 'todos'
            ? postsSimulados
            : postsSimulados.filter(post => post.category === categoriaFiltro);

        containerDaGrade.innerHTML = '';

        postsParaExibir.forEach(post => {
            const cartaoPost = document.createElement('article');
            cartaoPost.className = 'post-card';
            cartaoPost.style.backgroundImage = `url('${post.imageSrc}')`; 
            cartaoPost.addEventListener('click', () => abrirModalDoPost(post));

            const camadaSobreposta = document.createElement('div');
            camadaSobreposta.className = 'post-overlay';
            camadaSobreposta.innerHTML = `
                <div class="overlay-info"><span>❤️</span><span>${post.likes}</span></div>
                <div class="overlay-info"><span>💬</span><span>${post.comments.length}</span></div>
            `;
            
            cartaoPost.appendChild(camadaSobreposta);
            containerDaGrade.appendChild(cartaoPost);
        });
    }

    // Abre o modal com os detalhes de um post específico.
    function abrirModalDoPost(post) {
        if (!post || !modalDeDetalhes) return;

        const imagemDoModal = modalDeDetalhes.querySelector('.modal-image');
        const curtidasDoModal = modalDeDetalhes.querySelector('#modal-likes-count');
        const listaDeComentarios = modalDeDetalhes.querySelector('.modal-comments-list');
        
        imagemDoModal.style.backgroundImage = `url('${post.imageSrc}')`;
        curtidasDoModal.textContent = post.likes;
        
        listaDeComentarios.innerHTML = '';
        post.comments.forEach(comentario => {
            const elementoComentario = document.createElement('div');
            elementoComentario.className = 'comment-item';
            elementoComentario.innerHTML = `<div><strong>${comentario.user}</strong> <span>${comentario.text}</span></div>`;
            listaDeComentarios.appendChild(elementoComentario);
        });

        modalDeDetalhes.classList.add('visivel');
    }

    // Fecha o modal de detalhes do post.
    const fecharModal = () => {
        if(modalDeDetalhes) modalDeDetalhes.classList.remove('visivel');
    };

    // Adiciona um novo comentário (simulado) na lista de comentários do modal.
    function tratarEnvioDeComentario(evento) {
        evento.preventDefault();
        const campoComentario = document.getElementById('comment-input');
        const listaDeComentarios = document.querySelector('.modal-comments-list');
        
        const textoNovoComentario = campoComentario.value;
        if (textoNovoComentario.trim() === '') return;

        const novoElementoComentario = document.createElement('div');
        novoElementoComentario.className = 'comment-item';
        novoElementoComentario.innerHTML = `<div><strong>você</strong> <span>${textoNovoComentario}</span></div>`;
        listaDeComentarios.appendChild(novoElementoComentario);

        campoComentario.value = '';
    }

    botaoExibirFiltros.addEventListener('click', () => {
        containerOpcoesFiltro.classList.toggle('visivel');
    });

    botoesDeCategoria.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesDeCategoria.forEach(btn => btn.classList.remove('active'));
            botao.classList.add('active');
            const categoriaSelecionada = botao.dataset.categoria;
            renderizarPostsNaGrade(categoriaSelecionada);
        });
    });

    if(botaoFecharModal) botaoFecharModal.addEventListener('click', fecharModal);
    if(modalDeDetalhes) modalDeDetalhes.addEventListener('click', (evento) => {
        if (evento.target === modalDeDetalhes) fecharModal();
    });

    if(formularioComentario) formularioComentario.addEventListener('submit', tratarEnvioDeComentario);

    document.querySelector('.btn-categoria[data-categoria="todos"]').classList.add('active');
    renderizarPostsNaGrade();
});