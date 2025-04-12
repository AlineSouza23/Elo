import { Document, Image, Page, PDFDownloadLink, PDFViewer, Text, View } from "@react-pdf/renderer";
import { estilo } from "./style";

import logo from '../../imagens/logo.png'

type ItemType = {
    id: number;
    name: string;
    price: string;
};

export function Invoice() {
    // Definição dinâmica das colunas
    const columns = [
        { key: "id", label: "Tipo" },
        { key: "name", label: "Período de Contrato" },
        { key: "price", label: "Valor Mensal" },
    ];

    // Dados fictícios
    const data = [
        { id: 1, name: "6 meses", price: "R$ 50,00" },
        { id: 2, name: "12 meses", price: "R$ 50,00" },
        { id: 3, name: "24 meses", price: "R$ 50,00" },
        { id: 4, name: "36 meses", price: "R$ 50,00" },
    ];

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
                    <Text style={estilo.title}>Olá Aline</Text>
                    <Text>
                        Segue as informações em PDF do relatório referente aos
                        modulo selecionado na calculadora de preços da Elo.
                    </Text>
                </View>

                {/* Informação do módulo */}
                <View style={estilo.spaceX}>
                    <Text style={[estilo.billTo, estilo.textBold]}>Detalhes:</Text>

                    <View style={estilo.info}>
                        <Text>Módulo Selecionado:</Text>
                        <Text>Advice Stand In</Text>
                    </View>
                    <View style={estilo.info}>
                        <Text>Tipo e Tier:</Text>
                        <Text>Credenciador Tier 1</Text>
                    </View>
                    <View style={estilo.info}>
                        <Text>Inteligência Artificial:</Text>
                        <Text>Não</Text>
                    </View>

                    <View style={estilo.info}>
                        <Text>Número de Customizações:</Text>
                        <Text>0</Text>
                    </View>
                    <View style={estilo.info}>
                        <Text>Quantidade de Usuários:</Text>
                        <Text>0</Text>
                    </View>
                    <View style={estilo.info}>
                        <Text>Datas Especiais:</Text>
                        <Text>0</Text>
                    </View>
                </View>

                {/* Render the table*/}
                <View style={estilo.table}>
                    {/* Cabeçalho dinâmico */}
                    <View style={[estilo.row, estilo.header]}>
                        {columns.map((col) => (
                            <Text key={col.key} style={[estilo.cell, estilo.boldText]}>
                                {col.label}
                            </Text>
                        ))}
                    </View>

                    {/* Linhas da tabela */}
                    {data.map((item, index) => (
                        <View key={item.id} style={[estilo.row, index % 2 === 0 ? estilo.evenRow : estilo.row]}>
                            {columns.map((col) => (
                                <Text key={col.key} style={estilo.cell}>
                                    {item[col.key as keyof ItemType]}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>

                {/* Rodapé */}
                <View style={estilo.footer}>
                    <Text style={estilo.footerText}>© 2025 Elo Serviços S.A.</Text>       
                </View>
            </Page>
        </Document>
    );
    return (
        <>
            <div style={{ width: "100%", height: "750px", display: 'flex' }}>
                <PDFViewer width="100%" height="100%">
                    <InvoicePDF />
                </PDFViewer>

                <PDFDownloadLink document={<InvoicePDF />} fileName="modulo_selecionado.pdf">
                    {({ loading }) => (loading ? "Gerando PDF..." : "Baixar PDF")}
                </PDFDownloadLink>
            </div>
        </>
    )
}