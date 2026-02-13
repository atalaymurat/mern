import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  /* ================= PAGE ================= */

  page: {
    fontFamily: "Ubuntu",
    fontSize: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },

  /* ================= GENERIC LAYOUT ================= */

  section: {
    flexDirection: "column",
    width: "100%",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    width: "100%",
  },

  column: {
    flexDirection: "column",
  },

  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  alignCenter: {
    alignItems: "center",
  },

  alignRight: {
    alignItems: "flex-end",
  },

  /* ================= TYPOGRAPHY ================= */

  heading: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },

  label: {
    fontWeight: "bold",
    color: "#555",
    marginRight: 4,
  },

  small: {
    fontSize: 9,
  },

  bold: {
    fontWeight: "bold",
  },

  /* ================= TABLE ================= */

  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#162a42",
    color: "#fff",
    fontSize: 9,
  },

  th: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },

  td: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: "#000",
    fontSize: 9,
  },

  tdRight: {
    textAlign: "right",
  },

  tdCenter: {
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#000",
  },

  /* ================= TOTALS ================= */

  totalsWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  totalsBox: {
    width: "35%",
    borderWidth: 1,
    borderColor: "#000",
  },

  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  totalsGrand: {
    fontWeight: "bold",
  },

  /* ================= BANK INFO ================= */

  bankSection: {
    marginTop: 15,
  },

  bankRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
});