
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
        
        cartaoPost.appendChild(camadaSobreposta);
        containerDaGrade.appendChild(cartaoPost);
    });
}