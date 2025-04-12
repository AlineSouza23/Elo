document.getElementById("calcularPreco").addEventListener("click", function () {
    const modulo = document.getElementById("modulo").value;
    const tipoTier = document.getElementById("tipoTier").value.split(" ");
    const tipo = tipoTier[0]; // Credenciador ou Emissor
    const tier = parseInt(tipoTier[2]); // Pega o número do tier
    const numServicos = parseInt(document.getElementById("numServicos").value) || 0;
    const dataEspecial = document.getElementById("dataEspecial").value;
    const fidelidade = parseInt(document.getElementById("fidelidade").value);
    const inteligenciaArtificial = document.getElementById("inteligenciaArtificial").value;
    const numCustomizacoes = document.getElementById("numCustomizacoes").value;
    const numUsuarios = parseInt(document.getElementById("numUsuarios").value) || 0;
        
    
    // Tabela de preços base
    const precosBase = {
        "Autorização": [7000, 14000, 21000, 28000, 35000, 42000, 49000],
        "Liquidação": [7000, 14000, 21000, 28000, 35000, 42000, 49000],
        "Fluxo de Disputa": [4000, 6000, 8000, 10000, 12000, 14000, 16000],
        "Autorizado Pendente de Liquidação": [4000, 6000, 8000, 10000, 12000, 14000, 16000],
        "Rejeições": [5000, 7000, 9000, 11000, 13000, 15000, 17000],
        "Fraude": [5000, 8000, 11000, 14000, 17000, 20000, 23000],
        "3DS": [1500, 3000, 4500, 6000, 7500, 9000, 10500],
        "Advice Stand In": [1500, 3000, 4500, 6000, 7500, 9000, 10500],
        "Stand In": [1500, 3000, 4500, 6000, 7500, 9000, 10500],
        "HUB QR Code": [1500, 3000, 4500, 6000, 7500, 9000, 10500]
    };
// Tabela de descontos
    const descontosServicos = { 1: 0.05, 2: 0.07, 3: 0.10, 4: 0.15 };
    const descontosFidelidade = { 6: 0.03, 12: 0.10, 24: 0.20, 36: 0.25 };
    const descontoDatasEspeciais = 0.35; // 35% para datas especiais (por 2 meses)
     // Tabela de preços de IA
    const precosIA = [500, 750, 800, 1000, 1250, 1500, 1800];

    // Tabela de valores fixos de customização
    const valoresCustomizacao = {
        "Credenciador": [100, 150, 200, 250, 300, 350, 400],
        "Emissor": [200, 250, 300, 350, 400, 500, 550]
    };

   // Fatores multiplicativos para a complexidade
   const fatoresMultiplicativos = {
    "1": 1.25,   // Baixa
    "2-3": 1.5,  // Média
    "4-6": 1.75, // Alta
    "7": 2,      // Muito Alta
    "8": 2.25,   // Adicionais (+1 cada)
    "9": 2.5,
    "10": 2.75,
    "11": 3,
    "12": 3.25,
    "13": 3.5,
    "14": 3.75,
    "15": 4,
    "16": 4.25,
    "17": 4.5,
    "18": 4.75,
    "19": 5,
    "20": 5.25
};

    // Verifica se o módulo selecionado tem um preço definido
    if (!precosBase[modulo]) {
        alert("Módulo não encontrado");
        return;
    }

    // Obtém o valor base
    let precoBase = precosBase[modulo][tier - 1];

    // Adiciona o valor do serviço financeiro contratado
    let precoFinal = precoBase + (numServicos * 700);

    // Adiciona o valor da IA, se selecionado
    if (inteligenciaArtificial === "sim") {
        precoFinal += precosIA[tier - 1];
    }
    // Lógica para Quantidade de Usuários
    if (numUsuarios > 0) {
        if (numUsuarios <= 5) {
            precoFinal += 700;
        } else {
            precoFinal += 700 + (numUsuarios - 5) * 100;
        }
    }
    // Lógica de customizações (somente se diferente de "0")
    if (numCustomizacoes !== "0") {
        let valorCustomizacao = valoresCustomizacao[tipo][tier - 1] || 0;
        let fatorMultiplicativo = fatoresMultiplicativos[numCustomizacoes] || 1;
        precoFinal += valorCustomizacao * fatorMultiplicativo;
    }

    // Calcula os descontos
let descontoTotal = 0;

// Aplicar desconto por serviços contratados
if (numServicos > 0) {
    descontoTotal += descontosServicos[numServicos] || 0;
}

// Aplicar desconto por fidelidade
if (fidelidade > 0) {
    descontoTotal += descontosFidelidade[fidelidade] || 0;
}

// Aplicar desconto por datas especiais (se selecionado)
if (dataEspecial !== "0") {
    descontoTotal += descontoDatasEspeciais;
}

// Aplicar o desconto no preço final
const precoComDesconto = precoFinal - (precoFinal * descontoTotal);

// Atualizar exibição do preço final
document.getElementById("precoFinal").textContent = 
    `Preço Final: R$ ${precoComDesconto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
});
document.getElementById("gerarPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

        // Adicionar título
        doc.setFontSize(16);
        doc.text("Relatório de Preços", 80, 30);

        // Capturar valores dos campos
        let modulo = document.getElementById("modulo").value;
        let tipoTier = document.getElementById("tipoTier").value;
        let inteligenciaArtificial = document.getElementById("inteligenciaArtificial").value;
        let numUsuarios = document.getElementById("numUsuarios").value;
        let numCustomizacoes = document.getElementById("numCustomizacoes").value;
        let dataEspecial = document.getElementById("dataEspecial").value;
        let fidelidade = document.getElementById("fidelidade").value;
        let precoFinal = document.getElementById("precoFinal").innerText;

        // Adicionar conteúdo ao PDF
        doc.setFontSize(12);
        doc.text(`Módulo Selecionado: ${modulo}`, 10, 50);
        doc.text(`Tipo e Tier: ${tipoTier}`, 10, 60);
        doc.text(`Inteligência Artificial: ${inteligenciaArtificial}`, 10, 70);
        doc.text(`Número de Customizações: ${numCustomizacoes}`, 10, 80);
        doc.text(`Quantidade de Usuários: ${numUsuarios}`, 10, 90);
        doc.text(`Datas Especiais: ${dataEspecial}`, 10, 100);
        doc.text(`Sistema de Fidelidade: ${fidelidade}`, 10, 110);
        doc.text(precoFinal, 10, 120);

        // Salvar o PDF
        doc.save("relatorio_precos.pdf");
   
});

