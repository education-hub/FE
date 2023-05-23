/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";
import axios from "axios";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

// Define the A4 size
// const PAGE_HEIGHT = 842;
// const PAGE_WIDTH = 595;

// Define styles for the table
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
});

const PdfSubmission = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  const params = useParams();
  const { id } = params;

  console.log(loading, data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    axios
      .get(`https://go-event.online/admin/admission/${id}`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setData(data);
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          title: "Failed to Fetch Data!!",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const pdfViewerHeight = window.innerHeight;

  return (
    <div>
      <PDFViewer height={pdfViewerHeight} width="100%">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.table}>
              <View key={id} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Image src={"/org1.png"} style={{ width: 50, height: 50 }} />
                </View>
                <View style={styles.tableCell}>
                  <Text>{"oke gan"}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{"email gan"}</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PdfSubmission;
