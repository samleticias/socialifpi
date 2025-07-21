import { API_BASE_URL } from "../config.js";

// Função que abre o Modal com os detalhes de um post específico
export async function abrirModalDoPost(post) {
    const modalDeDetalhes = document.getElementById('post-detail-modal');
    if (!post || !modalDeDetalhes) return;

    // Busca os detalhes do post no backend
    let postDetalhado;
    try {
        const resposta = await fetch(`${API_BASE_URL}/socialifpi/posts/${post.id}`);
        postDetalhado = await resposta.json();
    } catch (e) {
        console.error('Erro ao buscar detalhes do post:', e);
        return;
    }

    modalDeDetalhes.dataset.currentPostId = postDetalhado.id;
    const imagemDoModal = modalDeDetalhes.querySelector('.modal-image');
    const curtidasDoModal = modalDeDetalhes.querySelector('#modal-likes-count');
    const listaDeComentarios = modalDeDetalhes.querySelector('.modal-comments-list');
    const tituloDoModal = modalDeDetalhes.querySelector('#modal-titulo');
    const categoriaDoModal = modalDeDetalhes.querySelector('#modal-categoria');
    const conteudoDoModal = modalDeDetalhes.querySelector('#modal-conteudo');
    
    imagemDoModal.style.backgroundImage = `url('${postDetalhado.imagePath ? API_BASE_URL + '/' + postDetalhado.imagePath : ''}')`;
    curtidasDoModal.textContent = postDetalhado.likes;
    tituloDoModal.textContent = postDetalhado.title;
    categoriaDoModal.textContent = postDetalhado.category || '';
    conteudoDoModal.textContent = postDetalhado.content;
    
    listaDeComentarios.innerHTML = '';
    (postDetalhado.comments || []).forEach(comentario => {
        const elementoComentario = document.createElement('div');
        elementoComentario.className = 'comment-item';
        elementoComentario.innerHTML = `<div><strong>${comentario.author}</strong> <span>${comentario.content}</span></div>`;
        listaDeComentarios.appendChild(elementoComentario);
    });

    modalDeDetalhes.classList.add('visivel');
}

// Função para fechar o modal de detalhes
export function fecharModal() {
    document.getElementById('post-detail-modal')?.classList.remove('visivel');
}

// Função para modal de denúncia e post excluído
export function exibirAlerta(titulo, mensagem, mostrarBotaoCancelar = false, callbackConfirmar = () => {}) {
    const alertaModal = document.getElementById('alerta-modal');
    if (!alertaModal) return;

    const alertaTitulo = alertaModal.querySelector('#alerta-titulo');
    const alertaMensagem = alertaModal.querySelector('#alerta-mensagem');
    const alertaBtnConfirmar = alertaModal.querySelector('#alerta-btn-confirmar');
    const alertaBtnCancelar = alertaModal.querySelector('#alerta-btn-cancelar');

    alertaTitulo.textContent = titulo;
    alertaMensagem.textContent = mensagem;

    alertaBtnCancelar.style.display = mostrarBotaoCancelar ? 'inline-block' : 'none';
    alertaBtnConfirmar.textContent = mostrarBotaoCancelar ? 'Confirmar' : 'OK';
    
    alertaModal.classList.add('visivel');

    const novoBtnConfirmar = alertaBtnConfirmar.cloneNode(true);
    alertaBtnConfirmar.parentNode.replaceChild(novoBtnConfirmar, alertaBtnConfirmar);
    
    novoBtnConfirmar.addEventListener('click', () => {
        callbackConfirmar();
        alertaModal.classList.remove('visivel');
    });

    alertaBtnCancelar.onclick = () => {
        alertaModal.classList.remove('visivel');
    };
}