// Arquivo para lidar com as ações de um usuário(criar post, comentário, exclusão, denúncia)

import { postsSimulados } from './dados.js';
import { renderizarPostsNaGrade } from './render.js';
import { fecharModal, exibirAlerta } from './modal.js';

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
    
    let imagemSrc = `https://via.placeholder.com/600/?text=${tituloInput.value.replace(/\s/g, '+')}`;

    // Processa a imagem anexada, se houver
    if (imagemInput.files.length > 0) {
        const arquivo = imagemInput.files[0];
        try {
            imagemSrc = await new Promise((resolve, reject) => {
                const leitor = new FileReader();
                leitor.onload = () => resolve(leitor.result);
                leitor.onerror = reject;
                leitor.readAsDataURL(arquivo);
            });
        } catch (erro) {
            return exibirAlerta('Erro', 'Não foi possível carregar a imagem selecionada.', false);
        }
    }

    const novoPost = {
        id: Date.now(),
        title: tituloInput.value,
        content: conteudoInput.value, // Salva o conteúdo
        category: categoriaInput.value,
        imageSrc: imagemSrc,
        likes: 0,
        comments: []
    };
    
    postsSimulados.unshift(novoPost);
    renderizarPostsNaGrade();
    formulario.reset();
}

// Função para enviar um comentário
export function enviarComentario(evento) {
    evento.preventDefault();
    const formulario = evento.target;
    const campoComentario = formulario.querySelector('#comment-input');
    const listaDeComentarios = document.querySelector('.modal-comments-list');

    const textoNovoComentario = campoComentario.value;
    if (textoNovoComentario.trim() === '' || !listaDeComentarios) return;

    const novoElementoComentario = document.createElement('div');
    novoElementoComentario.className = 'comment-item';
    novoElementoComentario.innerHTML = `<div><strong>você</strong> <span>${textoNovoComentario}</span></div>`;
    listaDeComentarios.appendChild(novoElementoComentario);
    campoComentario.value = '';
}

// Função para lidar com exclusão de um post
export function excluirPost() {
    const modalDeDetalhes = document.getElementById('post-detail-modal');
    const postIdParaExcluir = parseInt(modalDeDetalhes.dataset.currentPostId || '0');
    
    exibirAlerta('Confirmar Exclusão', 'Tem certeza que deseja excluir esta postagem? Esta ação não pode ser desfeita.', true, () => {
        const index = postsSimulados.findIndex(post => post.id === postIdParaExcluir);
        if (index > -1) {
            postsSimulados.splice(index, 1);
        }
        fecharModal();
        renderizarPostsNaGrade();
        exibirAlerta('Sucesso', 'A postagem foi excluída.', false);
    });
}

// Função para lidar com o envio de uma denúncia.
export function enviarDenuncia(evento) {
    evento.preventDefault();
    document.getElementById('report-modal')?.classList.remove('visivel');
    fecharModal();
    exibirAlerta('Denúncia Enviada', 'Sua denúncia foi recebida e será analisada.', false);
}


export function tratarCurtida(postId) {
    // Encontra o post específico na nossa lista de dados
    const postAlvo = postsSimulados.find(p => p.id === postId);
    if (!postAlvo) return;

    // Apenas incrementa o número de curtidas
    postAlvo.likes++;

    // Pega o filtro que está ativo na tela para renderizar corretamente
    const filtroAtivo = document.querySelector('.btn-categoria.active')?.dataset.categoria || 'todos';
    
    // Re-renderiza a grade de posts para mostrar a contagem atualizada
    renderizarPostsNaGrade(filtroAtivo);
}