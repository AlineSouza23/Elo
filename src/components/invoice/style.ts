import { StyleSheet } from "@react-pdf/renderer";

export const estilo = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    color: '#262626',
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: '30px 50px',
  },
  headerPdf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  profileLogo: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: 'flex-start',
  },
  logo: {
    width: '100px',
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
    fontWeight: 'bold',
  },
  spaceY: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    marginBottom: 25,
  },
  spaceX: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginBottom: 50,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  billTo: {
    marginBottom: 10,
  },
  info: {
    width: "300px",
    padding: "4px 0 4px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  /* table */
  table: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomStyle: "solid",
    paddingVertical: 6,
    alignItems: "center",
  },
  header: {
    backgroundColor: "#003933",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 6,
    fontSize: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  /* Rodapé */
  footer: {
    marginTop: 80,
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 10,
    textAlign: 'center',
    gap: "5px",
  },
  footerText: {
    fontSize: 10,
    color: '#000',

  },
});
