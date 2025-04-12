import React, { useState } from "react";
import "jspdf-autotable";
import styles from './teste.module.css';
import { Document, Image, Page, Text, View, pdf } from "@react-pdf/renderer"; // Importação de pdf do react-pdf
import { estilo } from "./style";
import logo from '../../imagens/logo.png';

const CalculadoraPreco: React.FC = () => {
  const [modulo, setModulo] = useState<string>("0");
  const [nome, setNome] = useState<string>('');
  const [tipoTier, setTipoTier] = useState<string>("Credenciador Tier 1");
  const [numCustomizacoes, setNumCustomizacoes] = useState<string>("0");
  const [numUsuarios, setNumUsuarios] = useState<number>(0);
  const [valorAdicional, setValorAdicional] = useState<number>(0);
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

    const precoComValorAdicional = precoComDesconto - (precoComDesconto * valorAdicional / 100);

    setPrecos({
      valor6: `R$ ${Math.round(precoComValorAdicional - (precoComValorAdicional * descontosFidelidade[6] || 0))
        .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,

      valor12: `R$ ${Math.round(precoComValorAdicional - (precoComValorAdicional * descontosFidelidade[12] || 0))
        .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,

      valor24: `R$ ${Math.round(precoComValorAdicional - (precoComValorAdicional * descontosFidelidade[24] || 0))
        .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,

      valor36: `R$ ${Math.round(precoComValorAdicional - (precoComValorAdicional * descontosFidelidade[36] || 0))
        .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    });
  };

  const gerarPDF = () => {
    const nome = (document.getElementById("nome") as HTMLInputElement).value.trim();
    if (nome === "") {
      alert("Por favor, digite um nome antes de gerar o PDF.");
      return;
    }
    const InvoicePDF = () => (
      <Document>
        <Page size="A4" style={estilo.page}>
          <View style={estilo.headerPdf}>
            <View style={estilo.profileLogo}>
              <Image src={logo} style={estilo.logo} />
              <Text>Relatório de preços</Text>
            </View>
            <View style={estilo.spaceY}>
              <Text style={estilo.textBold}>Elo Serviços S.A.</Text>
              <Text>Alameda Xingu, 512, 5° e 6º andares</Text>
              <Text>Alphaville, Barueri, SP, 06.455-030</Text>
            </View>
          </View>

          <View style={estilo.spaceX}>
            <Text>
              Segue as informações em PDF do relatório referente ao
              módulo selecionado na calculadora de preços da Elo para <Text style={[estilo.billTo, estilo.textBold]}>{nome}</Text>

            </Text>
          </View>

          {/* Informações do módulo */}
          <View style={estilo.spaceX}>
            <Text style={[estilo.billTo, estilo.textBold]}>Detalhes:</Text>

            <View style={estilo.info}>
              <Text>Módulo Selecionado:</Text>
              <Text>{modulo}</Text>
            </View>
            <View style={estilo.info}>
              <Text>Tipo e Tier:</Text>
              <Text>{tipoTier}</Text>
            </View>

            <View style={estilo.info}>
              <Text>Número de Customizações:</Text>
              <Text>{numCustomizacoes}</Text>
            </View>
            <View style={estilo.info}>
              <Text>Quantidade de Usuários:</Text>
              <Text>{numUsuarios}</Text>
            </View>
            <View style={estilo.info}>
              <Text>Datas Especiais:</Text>
              <Text>{dataEspecial}</Text>
            </View>
            <View style={estilo.info}>
              <Text>Desconto Adicional:</Text>
              <Text>{valorAdicional}%</Text>
            </View>
          </View>
          

          {/* Tabela de preços */}
          <View style={estilo.table}>
            <View style={[estilo.row, estilo.header]}>
              <Text style={[estilo.cell, estilo.boldText]}>Período de Contrato</Text>
              <Text style={[estilo.cell, estilo.boldText]}>Valor Mensal</Text>
            </View>
            <View style={estilo.row}>
              <Text style={estilo.cell}>6 meses</Text>
              <Text style={estilo.cell}>{precos.valor6}</Text>
            </View>
            <View style={estilo.row}>
              <Text style={estilo.cell}>12 meses</Text>
              <Text style={estilo.cell}>{precos.valor12}</Text>
            </View>
            <View style={estilo.row}>
              <Text style={estilo.cell}>24 meses</Text>
              <Text style={estilo.cell}>{precos.valor24}</Text>
            </View>
            <View style={estilo.row}>
              <Text style={estilo.cell}>36 meses</Text>
              <Text style={estilo.cell}>{precos.valor36}</Text>
            </View>
          </View>

          {/* Rodapé */}
          <View style={estilo.footer}>
            <Text style={estilo.footerText}>© 2025 Elo Serviços S.A.</Text>
          </View>
        </Page>
      </Document>
    );

    // Gerar o PDF programaticamente e forçar o download
    pdf(<InvoicePDF />).toBlob().then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "relatorio_precos.pdf";
      link.click();
    });

  };

  return (
    <div className={styles.container}>
      <h1>Calculadora de Preços</h1>
      <label>Módulo:</label>
      <select value={modulo} onChange={(e) => setModulo(e.target.value)}>
        <option value="0">Selecione um Módulo</option>
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
        <option value="Credenciador Tier 1">Credenciador Tier 1</option>
        <option value="Credenciador Tier 2">Credenciador Tier 2</option>
        <option value="Credenciador Tier 3">Credenciador Tier 3</option>
        <option value="Credenciador Tier 4">Credenciador Tier 4</option>
        <option value="Credenciador Tier 5">Credenciador Tier 5</option>
        <option value="Credenciador Tier 6">Credenciador Tier 6</option>
        <option value="Credenciador Tier 7">Credenciador Tier 7</option>
        <option value="Emissor Tier 1">Emissor Tier 1</option>
        <option value="Emissor Tier 2">Emissor Tier 2</option>
        <option value="Emissor Tier 3">Emissor Tier 3</option>
        <option value="Emissor Tier 4">Emissor Tier 4</option>
        <option value="Emissor Tier 5">Emissor Tier 5</option>
        <option value="Emissor Tier 6">Emissor Tier 6</option>
        <option value="Emissor Tier 7">Emissor Tier 7</option>
      </select>


      <label>Número de Customizações:</label>
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

      <label>Quantidade de Usuários: </label>
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

      <label>Datas Especiais:</label>
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
      <label>Desconto Adicional (%):</label> {/* Novo campo para o valor adicional */}
      <input
        type="number"
        value={valorAdicional}
        onChange={(e) => setValorAdicional(Number(e.target.value))}
        placeholder="Digite o valor adicional (%)"
      />
      <label>Digite o nome do parceiro:</label> {/* Novo campo para o valor adicional */}
     <input
        type="text"
        id="nome"
        value={nome}
        placeholder="Digite o nome do parceiro"
        onChange={e => setNome(e.target.value)}
      />


      <button onClick={calcularPreco}>Calcular Preço</button>
      <button onClick={gerarPDF}>Gerar PDF</button>
    </div>
  );
};

export default CalculadoraPreco;
