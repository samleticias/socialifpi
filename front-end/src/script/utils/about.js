const devs = {
    front1: {
      nome: "Enzo Melo",
      imagem: "../images/devs/enzo.jpeg",
      descricao: "Sou desenvolvedor com habilidades em desenvolvimento web, principalmente no front-end. Além disso, também atuo na área de sistemas embarcados, com experiência em integrar hardware com soluções do dia a dia."
    },
    front2: {
      nome: "Kaio Gabriel",
      imagem: "../images/devs/kaio.png",
      descricao: "Tenho grande interesse em programação, desenvolvimento de jogos e tecnologias web. Estou sempre em busca de aprender e crescer, expandindo continuamente meu conhecimento passo a passo no mundo da tecnologia."
    },
    back1: {
      nome: "João Victor",
      imagem: "../images/devs/jota.jpeg",
      descricao: "Desenvolvedor com fortes habilidades em desenvolvimento web, tanto no front-end quanto no back-end. Atualmente, também atua na área de sistemas embarcados, unindo experiência em aplicações web modernas com soluções inovadoras em hardware."
    },
    back2: {
      nome: "Sammya Letícia",
      imagem: "../images/devs/sammya.jpg",
      descricao: "Sou desenvolvedora back-end focada em Java, atualmente explorando Django e React para ampliar minhas habilidades full-stack. Valorizo o trabalho em equipe e acredito que unir conhecimento com autenticidade é o caminho para entregar soluções cada vez melhores."
    }
  };

function mostrarDetalhes(devId) {
    const dev = devs[devId];
    document.getElementById("modalImagem").src = dev.imagem;
    document.getElementById("modalNome").textContent = dev.nome;
    document.getElementById("modalDescricao").textContent = dev.descricao;
    document.getElementById("modalDetalhes").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalDetalhes").style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    const botaoVoltar = document.getElementById('btn-voltar');

    if (botaoVoltar) {
        botaoVoltar.addEventListener('click', () => {
            history.back();
        });
    }
});