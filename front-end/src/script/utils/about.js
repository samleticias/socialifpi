const devs = {
    front1: {
      nome: "Enzo Melo",
      imagem: "caminho/enzo.jpg",
      descricao: "Descrição do enzo"
    },
    front2: {
      nome: "Kaio Gabriel",
      imagem: "caminho/kaio.jpg",
      descricao: "Descrição do kaio"
    },
    back1: {
      nome: "João Victor",
      imagem: "caminho/joao.jpg",
      descricao: "Descrição do jota"
    },
    back2: {
      nome: "Sammya Letícia",
      imagem: "../images/devs/sammya.png",
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