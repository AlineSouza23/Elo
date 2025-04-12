import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    fontSize: 12,
    padding: '30px 50px',
    flexDirection: 'column', // Apliquei para que o layout seja flexível, pode ajustar conforme necessário
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    width: '70%',
    maxWidth: 600,
    textAlign: 'center',
    // boxShadow não é suportado, por isso foi removido
  },
  h1: {
    fontSize: 20,
    marginBottom: 15,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 14,
    width: '90%',
    padding: 8,
    marginTop: 5,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  select: {
    fontSize: 14,
    width: '90%',
    padding: 8,
    marginTop: 5,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    padding: 10,
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 14,
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    // transition não é suportado, removi a propriedade
  },
  resultado: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  table: {
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    // borderCollapse não é suportado, removido
  },
  th: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 18,
    padding: 8,
    textAlign: 'left',
  },
  td: {
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    padding: 8,
  },
  trEven: {
    backgroundColor: '#f1f1f1',
  },
  trHover: {
    backgroundColor: '#f2f2f2',
    // Não é possível usar hover no @react-pdf/renderer, então removi
  },
  // Responsividade (não é diretamente suportada em @react-pdf/renderer, por isso vamos ter que usar lógica dinâmica)
  '@media (max-width: 480px)': {
    page: {
      padding: 10,
    },
    container: {
      width: '95%',
    },
    h1: {
      fontSize: 16,
    },
    input: {
      padding: 8,
      fontSize: 14,
    },
    button: {
      fontSize: 14,
      padding: 10,
    },
  },
  '@media (max-width: 1280px)': {
    container: {
      width: '60%',
      maxWidth: 500,
    },
    h1: {
      fontSize: 18,
    },
    table: {
      fontSize: 16,
    },
    th: {
      padding: 10,
    },
    td: {
      padding: 10,
    },
  },
});
