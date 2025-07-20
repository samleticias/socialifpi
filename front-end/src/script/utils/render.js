import { tratarCurtida } from './actions.js';
import { postsSimulados } from './dados.js';
import { abrirModalDoPost } from './modal.js';

/**
 * Filtra os posts por uma categoria específica e os renderiza na grade da página.
 *
 * @param {string} [categoriaFiltro='todos'] A categoria a ser usada para o filtro. O valor padrão é 'todos', que exibe todos os posts.
 * @returns {void}
 */
export function renderizarPostsNaGrade(categoriaFiltro = 'todos') {
    const containerDaGrade = document.getElementById('postagens-grid');
    if (!containerDaGrade) return;

    const postsParaExibir = categoriaFiltro === 'todos'
        ? postsSimulados
        : postsSimulados.filter(p => p.category === categoriaFiltro);
    
    containerDaGrade.innerHTML = '';
    postsParaExibir.forEach(post => {
        const cartaoPost = document.createElement('article');
        cartaoPost.className = 'post-card';
        cartaoPost.style.backgroundImage = `url('${post.imageSrc}')`;
        cartaoPost.addEventListener('click', () => abrirModalDoPost(post));
        
        // O overlay continua mostrando o número atualizado quando o mouse passar por cima
        const camadaSobreposta = document.createElement('div');
        camadaSobreposta.className = 'post-overlay';
        camadaSobreposta.innerHTML = `
            <div class="sobreposicao-conteudo">
                <h4 class="sobreposicao-titulo">${post.title}</h4>
                <div class="sobreposicao-info">
                    <span>❤️ ${post.likes}</span>
                    <span>💬 ${post.comments.length}</span>
                </div>
                <p class="sobreposicao-categoria">${post.category}</p>
            </div>
        `;

        const botaoCurtir = document.createElement('button');
        botaoCurtir.className = 'botao-curtir';
        
        
        botaoCurtir.innerHTML = `❤️ ${post.likes}`;

        botaoCurtir.addEventListener('click', (evento) => {
            evento.stopPropagation(); 
            tratarCurtida(post.id);
        });
        
        cartaoPost.appendChild(camadaSobreposta);
        cartaoPost.appendChild(botaoCurtir);
        containerDaGrade.appendChild(cartaoPost);
    });
}