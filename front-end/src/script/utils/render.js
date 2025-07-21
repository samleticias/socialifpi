import { tratarCurtida } from './actions.js';
import { postsSimulados } from './dados.js';
import { abrirModalDoPost } from './modal.js';
import { API_BASE_URL } from "../config.js";

/**
 * Filtra os posts por uma categoria específica e os renderiza na grade da página.
 *
 * @param {string} [categoriaFiltro='todos'] A categoria a ser usada para o filtro. O valor padrão é 'todos', que exibe todos os posts.
 * @returns {void}
 */
export async function renderizarPostsNaGrade(categoriaFiltro = 'todos') {
    const containerDaGrade = document.getElementById('postagens-grid');
    if (!containerDaGrade) return;

    // Busca os posts do backend
    let url = `${API_BASE_URL}/socialifpi/posts/ordered`;
    if (categoriaFiltro !== 'todos') {
        url += `?categoryName=${encodeURIComponent(categoriaFiltro)}`;
    }

    let postsParaExibir = [];
    try {
        const resposta = await fetch(url);
        postsParaExibir = await resposta.json();
    } catch (e) {
        console.error('Erro ao buscar posts do backend:', e);
        return;
    }
    
    containerDaGrade.innerHTML = '';
    postsParaExibir.forEach(post => {
        const cartaoPost = document.createElement('article');
        cartaoPost.className = 'post-card';
        cartaoPost.style.backgroundImage = `url('${post.imagePath ? API_BASE_URL + '/' + post.imagePath : ''}')`;
        cartaoPost.addEventListener('click', () => abrirModalDoPost(post));
        
        const camadaSobreposta = document.createElement('div');
        camadaSobreposta.className = 'post-overlay';
        camadaSobreposta.innerHTML = `
            <div class="sobreposicao-conteudo">
                <h4 class="sobreposicao-titulo">${post.title}</h4>
                <div class="sobreposicao-info">
                    <span>❤️ ${post.likes}</span>
                    <span>💬 ${post.qtdComments ?? 0}</span>
                </div>
                <p class="sobreposicao-categoria">${post.category || ''}</p>
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