import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const CalculadoraPreco: React.FC = () => {
    const [modulo, setModulo] = useState<string>("0");
    const [tipoTier, setTipoTier] = useState<string>("Credenciador Tier 1");
    const [inteligenciaArtificial, setInteligenciaArtificial] = useState<string>("nao");
    const [numCustomizacoes, setNumCustomizacoes] = useState<string>("0");
    const [numUsuarios, setNumUsuarios] = useState<number>(0);
    const [dataEspecial, setDataEspecial] = useState<string>("0");
    const [precos, setPrecos] = useState<any>({
        valor6: "R$ 0,00",
        valor12: "R$ 0,00",
        valor24: "R$ 0,00",
        valor36: "R$ 0,00",
    });

    const precosBase: { [key: string]: number[] } = {
        "Autorização": [7000, 14000, 21000, 28000, 35000, 42000, 49000],
        "Liquidação": [7000, 14000, 21000, 28000, 35000, 42000, 49000],
        "Fluxo de Disputa": [4000, 6000, 8000, 10000, 12000, 14000, 16000],
        "Autorizado Pendente de Liquidação": [4000, 6000, 8000, 10000, 12000, 14000, 16000],
        "Rejeições": [5000, 7000, 9000, 11000, 13000, 15000, 17000],
        "Fraude": [5000, 8000, 11000, 14000, 17000, 20000, 23000],
        "3DS": [1500, 3000, 4500, 6000, 7500, 9000, 10500],
        "Advice Stand In": [1500, 3000, 4500, 6000, 7500, 9000, 10500],
        "Stand In": [1500, 3000, 4500, 6000, 7500, 9000, 10500],
        "HUB QR Code": [1500, 3000, 4500, 6000, 7500, 9000, 10500],
    };

    const descontosFidelidade = { 6: 0.03, 12: 0.10, 24: 0.20, 36: 0.25 };
    const descontoDatasEspeciais = 0.35;
    const precosIA = [500, 750, 800, 1000, 1250, 1500, 1800];
    const valoresCustomizacao: Record<string, number[]> = {
        "Credenciador": [100, 150, 200, 250, 300, 350, 400],
        "Emissor": [200, 250, 300, 350, 400, 500, 550],
    };

    const fatoresMultiplicativos: Record<string, number> = {
        "1": 1.25, "2-3": 1.5, "4-6": 1.75, "7": 2, "8": 2.25,
        "9": 2.5, "10": 2.75, "11": 3, "12": 3.25, "13": 3.5,
        "14": 3.75, "15": 4, "16": 4.25, "17": 4.5, "18": 4.75,
        "19": 5, "20": 5.25
    };

    const calcularPreco = () => {
        const tipo = tipoTier.split(" ")[0];
        const tier = parseInt(tipoTier.split(" ")[1]) || 1;

        if (!precosBase[modulo]) {
            alert("Módulo não encontrado");
            return;
        }

        if (tier < 1 || tier > 7) {
            alert("Por favor, selecione um Tier válido.");
            return;
        }

        let precoBase = precosBase[modulo][tier - 1] || 0;
        let precoFinal = precoBase;

        if (inteligenciaArtificial === "sim") {
            precoFinal += precosIA[tier - 1] || 0;
        }

        if (numUsuarios > 0) {
            precoFinal += (numUsuarios <= 5) ? 700 : 700 + (numUsuarios - 5) * 100;
        }

        if (numCustomizacoes !== "0" && valoresCustomizacao[tipo]) {
            let valorCustomizacao = valoresCustomizacao[tipo][tier - 1] || 0;
            let fatorMultiplicativo = fatoresMultiplicativos[numCustomizacoes] || 1;
            precoFinal += valorCustomizacao * fatorMultiplicativo;
        }

        let descontoTotal = 0;
        if (dataEspecial !== "0") descontoTotal += descontoDatasEspeciais;

        const precoComDesconto = precoFinal - (precoFinal * descontoTotal);

        setPrecos({
            valor6: `R$ ${(precoComDesconto - (precoComDesconto * descontosFidelidade[6] || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            valor12: `R$ ${(precoComDesconto - (precoComDesconto * descontosFidelidade[12] || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            valor24: `R$ ${(precoComDesconto - (precoComDesconto * descontosFidelidade[24] || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            valor36: `R$ ${(precoComDesconto - (precoComDesconto * descontosFidelidade[36] || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        });
    };

    const gerarPDF = () => {
        const nome = (document.getElementById("nome") as HTMLInputElement).value.trim();
        if (nome === "") {
            alert("Por favor, digite um nome antes de gerar o PDF.");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("\nRelatório de Preços", 80, 2);
        doc.text("Olá " + nome + "\nSegue abaixo os valores relacionado ao módulo escolhido!", 20, 20);
        doc.setFontSize(12);
        doc.text(`Módulo Selecionado: ${modulo}`, 10, 50);
        doc.text(`Tipo e Tier: ${tipoTier}`, 10, 60);
        doc.text(`Inteligência Artificial: ${inteligenciaArtificial}`, 10, 70);
        doc.text(`Número de Customizações: ${numCustomizacoes}`, 10, 80);
        doc.text(`Quantidade de Usuários: ${numUsuarios}`, 10, 90);
        doc.text(`Datas Especiais: ${dataEspecial}`, 10, 100);

        const valores = [
            ["6 meses", precos.valor6],
            ["12 meses", precos.valor12],
            ["24 meses", precos.valor24],
            ["36 meses", precos.valor36],
        ];

        valores.forEach((valor, index) => {
            doc.text(`${valor[0]}: ${valor[1]}`, 10, 110 + (index * 10));
        });

        doc.save("calculo_preco.pdf");
    };

    return (
        <div className="container">
            <h1>Calculadora de Preços</h1>
            <label>Módulo:</label>
            <select value={modulo} onChange={(e) => setModulo(e.target.value)}>
                <option value="0">Nenhum</option>
                <option value="3DS">3DS</option>
                <option value="Advice Stand In">Advice Stand In</option>
                <option value="Autorização">Autorização</option>
                <option value="Autorizado Pendente de Liquidação">Autorizado Pendente de Liquidação</option>
                <option value="Fluxo de Disputa">Fluxo de Disputa</option>
                <option value="Fraude">Fraude</option>
                <option value="HUB QR Code">HUB QR Code</option>
                <option value="Liquidação">Liquidação</option>
                <option value="Rejeições">Rejeições</option>
                <option value="Stand In">Stand In</option>
            </select>

            <label>Tipo e Tier:</label>
            <select value={tipoTier} onChange={(e) => setTipoTier(e.target.value)}>
            <option value="Credenciador 1">Credenciador 1</option>
        <option value="Credenciador 2">Credenciador 2</option>
        <option value="Credenciador 3">Credenciador 3</option>
        <option value="Credenciador 4">Credenciador 4</option>
        <option value="Credenciador 5">Credenciador 5</option>
        <option value="Credenciador 6">Credenciador 6</option>
        <option value="Credenciador 7">Credenciador 7</option>
        <option value="Emissor 1">Emissor 1</option>
        <option value="Emissor 2">Emissor 2</option>
        <option value="Emissor 3">Emissor 3</option>
        <option value="Emissor 4">Emissor 4</option>
        <option value="Emissor 5">Emissor 5</option>
        <option value="Emissor 6">Emissor 6</option>
        <option value="Emissor 7">Emissor 7</option>
            </select>

            <select value={inteligenciaArtificial} onChange={(e) => setInteligenciaArtificial(e.target.value)}>
        <option value="nao">Não</option>
        <option value="sim">Sim</option>
      </select>

      <select value={numCustomizacoes} onChange={(e) => setNumCustomizacoes(e.target.value)}>
        <option value="0">Selecione o número de customizações</option>
        <option value="1">1</option>
        <option value="2-3">2-3</option>
        <option value="4-6">4-6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
      </select>

      <select value={numUsuarios} onChange={(e) => setNumUsuarios(Number(e.target.value))}>
        <option value="0">Selecione o número de usuários</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

      <select value={dataEspecial} onChange={(e) => setDataEspecial(e.target.value)}>
        <option value="0">Nenhuma</option>
        <option value="diaDasMaes">Semana do Dia das Mães</option>
        <option value="diaDasCriancas">Semana do Dia das Crianças</option>
        <option value="blackFriday">Semana da Black Friday</option>
        <option value="natal">Semana do Natal</option>
      </select>
            <table>
                <thead>
                    <tr>
                        <th>Período de Contrato</th>
                        <th>Valor Mensal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>6 meses</td>
                        <td>{precos.valor6}</td>
                    </tr>
                    <tr>
                        <td>12 meses</td>
                        <td>{precos.valor12}</td>
                    </tr>
                    <tr>
                        <td>24 meses</td>
                        <td>{precos.valor24}</td>
                    </tr>
                    <tr>
                        <td>36 meses</td>
                        <td>{precos.valor36}</td>
                    </tr>
                </tbody>
            </table>

            <input type="text" id="nome" placeholder="Digite o nome para aparecer no pdf" required />
            <button onClick={calcularPreco}>Calcular Preço</button>
            <button onClick={gerarPDF}>Gerar PDF</button>
        </div>
    );
};

export default CalculadoraPreco;
