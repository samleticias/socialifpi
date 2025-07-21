// Arquivo para lidar com as ações de um usuário(criar post, comentário, exclusão, denúncia)

import { postsSimulados } from './dados.js';
import { renderizarPostsNaGrade } from './render.js';
import { fecharModal, exibirAlerta, abrirModalDoPost } from './modal.js';
import { API_BASE_URL } from "../config.js";

// Função para criar post a partir do formulário 
export async function criarPost(evento) {
    evento.preventDefault();
    const formulario = evento.target;
    const tituloInput = formulario.querySelector('#titulo');
    const categoriaInput = formulario.querySelector('#categoria');
    const conteudoInput = formulario.querySelector('#conteudo');
    const imagemInput = formulario.querySelector('#imagem');

    if (!tituloInput.value.trim() || !conteudoInput.value.trim()) {
        return exibirAlerta('Erro', 'Por favor, preencha o título e o conteúdo.', false);
    }

    // Monta o FormData para enviar para o backend
    const formData = new FormData();
    formData.append('title', tituloInput.value);
    formData.append('content', conteudoInput.value);
    formData.append('categoryName', categoriaInput.value);
    if (imagemInput.files.length > 0) {
        formData.append('image', imagemInput.files[0]);
    }

    try {
        const resposta = await fetch(`${API_BASE_URL}/socialifpi/posts`, {
            method: 'POST',
            body: formData
        });

        if (!resposta.ok) {
            throw new Error('Erro ao criar post');
        }

        exibirAlerta('Sucesso', 'Post criado com sucesso!', false);
        fecharModal();
        formulario.reset();
        renderizarPostsNaGrade();
    } catch (erro) {
        exibirAlerta('Erro', 'Não foi possível criar o post.', false);
    } finally {
    }
}

// Função para enviar um comentário
export async function enviarComentario(evento) {
    evento.preventDefault();
    const formulario = evento.target;
    const campoComentario = formulario.querySelector('#comment-input');
    const listaDeComentarios = document.querySelector('.modal-comments-list');
    const modalDeDetalhes = document.getElementById('post-detail-modal');
    const postId = modalDeDetalhes?.dataset.currentPostId;

    const textoNovoComentario = campoComentario.value;
    if (textoNovoComentario.trim() === '' || !listaDeComentarios || !postId) return;

    try {
        const resposta = await fetch(`${API_BASE_URL}/socialifpi/posts/${postId}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: textoNovoComentario
            })
        });

        if (!resposta.ok) {
            throw new Error('Erro ao enviar comentário');
        }

        
        // 2. Pega a resposta do servidor, que deve ser o comentário recém-criado
        const comentarioSalvo = await resposta.json();

        // 3. Cria o elemento HTML para o novo comentário USANDO os dados da resposta
        const elementoComentario = document.createElement('div');
        elementoComentario.className = 'comment-item';
        
        const dataDoComentario = new Date(comentarioSalvo.date);
        const dataFormatada = dataDoComentario.toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
        });

        elementoComentario.innerHTML = `
            <div class="comment-header">
                <strong>${comentarioSalvo.author}</strong>
                <span class="comment-timestamp">${dataFormatada}</span>
            </div>
            <p class="comment-content">${comentarioSalvo.content}</p>
        `;
        
        // 4. Usa .prepend() para adicionar o novo comentário NO TOPO da lista
        listaDeComentarios.prepend(elementoComentario);

        // 5. Limpa o campo de texto
        campoComentario.value = '';

        // atualiza o feed
        renderizarPostsNaGrade();

    } catch (erro) {
        exibirAlerta('Erro', 'Não foi possível enviar o comentário.', false);
    }
}

// Função para lidar com exclusão de um post
export async function excluirPost() {
    const modalDeDetalhes = document.getElementById('post-detail-modal');
    const postIdParaExcluir = parseInt(modalDeDetalhes?.dataset.currentPostId || '0');

    if (!postIdParaExcluir) {
        return exibirAlerta('Erro', 'Post não encontrado.', false);
    }

    exibirAlerta('Confirmar Exclusão', 'Tem certeza que deseja excluir esta postagem? Esta ação não pode ser desfeita.', true, async () => {
        try {
            const resposta = await fetch(`${API_BASE_URL}/socialifpi/posts/${postIdParaExcluir}`, {
                method: 'DELETE'
            });

            if (!resposta.ok) {
                throw new Error('Erro ao excluir o post');
            }

            fecharModal();
            renderizarPostsNaGrade();
            exibirAlerta('Sucesso', 'A postagem foi excluída.', false);
        } catch (erro) {
            exibirAlerta('Erro', 'Não foi possível excluir o post.', false);
        }
    });
}

// Função para lidar com o envio de uma denúncia.
export async function enviarDenuncia(evento) {
    evento.preventDefault();
    const modalDeDetalhes = document.getElementById('post-detail-modal');
    const postId = modalDeDetalhes?.dataset.currentPostId;
    const motivo = document.querySelector('input[name="reason"]:checked')?.value || '';
    const comentario = document.getElementById('report-comment')?.value || '';

    if (!postId || !motivo.trim()) {
        return exibirAlerta('Erro', 'Por favor, informe o motivo da denúncia.', false);
    }

    try {
        const resposta = await fetch(`${API_BASE_URL}/socialifpi/posts/${postId}/report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                reason: motivo,
                comment: comentario
            })
        });

        const respostaJson = await resposta.json();

        if (!resposta.ok) {
            throw new Error(respostaJson.message || 'Erro ao enviar denúncia');
        }

        document.getElementById('report-modal')?.classList.remove('visivel');

        if (respostaJson.message === "Post excluído devido a múltiplas denúncias") {
            exibirAlerta('Post Excluído', 'O post foi removido automaticamente após múltiplas denúncias.', false);
            fecharModal();
            renderizarPostsNaGrade();
        } else {
            exibirAlerta('Denúncia Enviada', 'Sua denúncia foi recebida e será analisada.', false);
        }
    } catch (erro) {
        exibirAlerta('Erro', 'Não foi possível enviar a denúncia.', false);
    }
}


export async function tratarCurtida(postId) {
    try {
        const resposta = await fetch(`${API_BASE_URL}/socialifpi/posts/${postId}/like`, {
            method: 'POST'
        });

        if (!resposta.ok) {
            throw new Error('Erro ao curtir o post');
        }

        // Atualiza a grade de posts com o filtro atual
        const filtroAtivo = document.querySelector('.btn-categoria.active')?.dataset.categoria || 'todos';
        renderizarPostsNaGrade(filtroAtivo);
    } catch (erro) {
        exibirAlerta('Erro', 'Não foi possível curtir o post.', false);
    }
}