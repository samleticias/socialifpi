
import { renderizarPostsNaGrade } from './utils/render.js';
import { fecharModal } from './utils/modal.js';
import { criarPost, excluirPost, enviarComentario, enviarDenuncia } from './utils/actions.js';
document.addEventListener('DOMContentLoaded', () => {

    // Seletores de elementos principais
    const formularioDePostagem = document.getElementById('form-nova-postagem');
    const modalDeDetalhes = document.getElementById('post-detail-modal');
    const formularioComentario = document.getElementById('comment-form');
    const optionsMenu = document.querySelector('.options-menu');
    const reportModal = document.getElementById('report-modal');
    const containerOpcoesFiltro = document.getElementById('opcoes-filtro');


    // Formulário de criar post submetido
    formularioDePostagem?.addEventListener('submit', criarPost);

    // Lógica para uso do modal ao clicar em um post ou fechar o modal de detalhes
    modalDeDetalhes?.querySelector('.close-modal-btn')?.addEventListener('click', fecharModal);
    modalDeDetalhes?.addEventListener('click', (evento) => {
        if (evento.target === modalDeDetalhes) fecharModal();
    });

    // Formulário de comentário submetido
    formularioComentario?.addEventListener('submit', enviarComentario);
    
    // Lógica do menu de três pontinhos em um post
    optionsMenu?.parentElement?.querySelector('.options-btn')?.addEventListener('click', (evento) => {
        evento.stopPropagation();
        optionsMenu.classList.toggle('visivel');
    });

    // Eventos dos botões dentro do menu de três pontos
    document.getElementById('btn-denunciar')?.addEventListener('click', () => reportModal?.classList.add('visivel'));
    document.getElementById('btn-cancelar-denuncia')?.addEventListener('click', () => reportModal?.classList.remove('visivel'));
    document.getElementById('report-form')?.addEventListener('submit', enviarDenuncia);
    document.getElementById('btn-excluir')?.addEventListener('click', excluirPost);
    
    // Evento dos filtros de postagens para mostrar ou exibir categorias
    document.getElementById('btn-exibir-filtros')?.addEventListener('click', () => {
        containerOpcoesFiltro?.classList.toggle('visivel');
    });
    containerOpcoesFiltro?.addEventListener('click', (evento) => {
        const target = evento.target;
        if (target.matches('.btn-categoria')) {
            const botaoClicado = target;
            containerOpcoesFiltro.querySelectorAll('.btn-categoria').forEach(btn => btn.classList.remove('active'));
            botaoClicado.classList.add('active'); // Marca a categoria como ativa
            renderizarPostsNaGrade(botaoClicado.dataset.categoria); // Passa a renderização em grade com a categoria escolhida
        }
    });
    
    // Lógica para fechar o menu de três pontos
    document.addEventListener('click', () => {
        if (optionsMenu?.classList.contains('visivel')) {
            optionsMenu.classList.remove('visivel');
        }
    });

    // Renderização da tela inicial
    document.querySelector('.btn-categoria[data-categoria="todos"]')?.classList.add('active');
    renderizarPostsNaGrade();
});