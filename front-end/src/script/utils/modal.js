
// Função que abre o Modal com os detalhes de um post específico
export function abrirModalDoPost(post) {
    const modalDeDetalhes = document.getElementById('post-detail-modal');
    if (!post || !modalDeDetalhes) return;

    modalDeDetalhes.dataset.currentPostId = post.id;
    const imagemDoModal = modalDeDetalhes.querySelector('.modal-image');
    const curtidasDoModal = modalDeDetalhes.querySelector('#modal-likes-count');
    const listaDeComentarios = modalDeDetalhes.querySelector('.modal-comments-list');
    const tituloDoModal = modalDeDetalhes.querySelector('#modal-titulo');
    const categoriaDoModal = modalDeDetalhes.querySelector('#modal-categoria');
    
    imagemDoModal.style.backgroundImage = `url('${post.imageSrc}')`;
    curtidasDoModal.textContent = post.likes;
    tituloDoModal.textContent = post.title;
    categoriaDoModal.textContent = post.category;
    
    listaDeComentarios.innerHTML = '';
    post.comments.forEach(comentario => {
        const elementoComentario = document.createElement('div');
        elementoComentario.className = 'comment-item';
        elementoComentario.innerHTML = `<div><strong>${comentario.user}</strong> <span>${comentario.text}</span></div>`;
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