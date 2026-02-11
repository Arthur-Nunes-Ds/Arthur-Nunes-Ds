const certificados = [
    "Analize de dados cisco.pdf",
    "Conceitos Basicos de Redes.pdf",
    "desenvolvimento de competencias empreendedoras 24.pdf",
    "dlj competencia empreendedoras 2025.pdf",
    "dlj etapa estadual 2025.pdf",
    "dlj finalista da Etapa Estadual 24.pdf",
    "dlj finalista da etapa regional 24.pdf",
    "Fundamentos do Hardware do Computador.pdf",
    "htmll cisco.pdf",
    "inovacao, Arte e Empreendedorismo 24.pdf",
    "introducao a Ciberseguranca.pdf",
    "python 1 cisco.pdf",
    "python 2 cisco.pdf"
];

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

let indiceAtual = 0;

const nomeElemento = document.getElementById("nome-certificado");
const canvas = document.getElementById("pdf-canvas");
const context = canvas.getContext("2d");

const btnVoltar = document.getElementById("btn-voltar");
const btnAvancar = document.getElementById("btn-avancar");

function carregarCertificado() {
    const nomeArquivo = certificados[indiceAtual];
    const url = `certificados/${encodeURIComponent(nomeArquivo)}`;

    // Remove o ".pdf" do nome exibido
    nomeElemento.textContent = nomeArquivo.replace(/\.pdf$/i, "");

    pdfjsLib.getDocument(url).promise
        .then(pdf => pdf.getPage(1))
        .then(page => {
        // Aumentamos a escala para o PDF ficar nítido, o CSS cuidará do tamanho na tela
        const viewport = page.getViewport({ scale: 1.5 }); 
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        return page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;
        })
        .catch(err => {
            console.error("Erro ao carregar:", nomeArquivo);
        });

    canvas.onclick = () => {
        window.open(url, "_blank");
    };
}

// Lógica de Voltar (Infinito)
btnVoltar.addEventListener("click", () => {
    if (indiceAtual > 0) {
        indiceAtual--;
    } else {
        indiceAtual = certificados.length - 1; // Se for o primeiro, vai para o último
    }
    carregarCertificado();
});

// Lógica de Avançar (Infinito)
btnAvancar.addEventListener("click", () => {
    if (indiceAtual < certificados.length - 1) {
        indiceAtual++;
    } else {
        indiceAtual = 0; // Se for o último, volta para o primeiro
    }
    carregarCertificado();
});

// Carrega o primeiro ao iniciar
carregarCertificado();
