
import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({

  container: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    width: '70%',
    margin: 'auto',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  select: {
    width: '100%',
    padding: 8,
    marginTop: 5,
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  input: {
    width: '95%',
    padding: 8,
    marginTop: 5,
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    width: '100%',
    backgroundColor: '#000',
    color: 'white',
    fontSize: 14,
    border: 'none',
    borderRadius: 5,
    marginTop: 20,
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    marginTop: 20,
    borderCollapse: 'collapse',
    borderRadius: 10,
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 8,
    textAlign: 'left',
  },
  td: {
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    padding: 8,
    textAlign: 'left',
  },
  trEven: {
    backgroundColor: '#f1f1f1',
  },
  trHover: {
    backgroundColor: '#f2f2f2',
 
  },
});
