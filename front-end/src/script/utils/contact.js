document.addEventListener('DOMContentLoaded', () => {
    const botaoVoltar = document.getElementById('btn-voltar');

    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', () => {
            history.back();
        });
    }
});