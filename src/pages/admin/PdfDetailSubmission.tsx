/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
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
import { Row, RowAddress } from "../../components/PdfComponent";
import { StudentDataType, ImageType } from "../../utils/user";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: "12px",
    padding: "10px",
  },
  tableRow: {
    flexDirection: "row",
    fontSize: "14px",
    marginVertical: "2px",
  },
  tableCell: {
    flex: 1,
    borderStyle: "solid",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  column1: {
    width: "40px",
    alignItems: "center",
    textAlign: "center",
  },
  column2: {
    width: "150px",
  },
  column3: {
    width: "250px",
  },
  column4: {
    width: "200px",
  },
});

const PdfSubmission = () => {
  const [data, setData] = useState<StudentDataType>({
    school_name: "",
    date_place: "",
    parent_data: {
      gender: "",
      name: "",
      job: "",
      phone: "",
      religion: "",
      address: {
        province: "",
        city: "",
        district: "",
        village: "",
        detail: "",
        zip_code: "",
      },
    },
    parent_signature: "",
    student_data: {
      gender: "",
      graduation_from: "",
      name: "",
      nisn: 0,
      photo: "",
      place_date: "",
      religion: "",
      address: {
        province: "",
        city: "",
        district: "",
        village: "",
        detail: "",
        zip_code: "",
      },
    },
    student_signature: "",
  });
  const [imageName, setImageName] = useState<ImageType>({
    photo: "",
    parent_signature: "",
    student_signature: "",
  });
  const [imageNameBase64, setImageNameBase64] = useState<ImageType>({
    photo: "",
    parent_signature: "",
    student_signature: "",
  });
  const [imageFormatParentSig, setImageFormatParentSig] = useState<string>("");
  const [imageFormatStudentSig, setImageFormatStudentSig] =
    useState<string>("");
  const [imageFormatPhoto, setImageFormatPhoto] = useState<string>("");
  const [cookie] = useCookies(["tkn"]);
  const checkToken = cookie.tkn;

  const params = useParams();
  const { id } = params;

  const pdfViewerHeight = window.innerHeight;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (imageNameBase64.parent_signature == "") {
      fetchAllDataImage();
    }
  }, [imageName.parent_signature]);

  const fetchData = async () => {
    axios
      .get(`https://go-event.online/admin/admission/${id}`, {
        headers: {
          Authorization: `Bearer ${checkToken}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setData(data);
        setImageName({
          ...imageName,
          parent_signature: data.parent_signature,
          student_signature: data.student_signature,
          photo: data.student_data.photo,
        });
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
      .finally(() => {});
  };

  console.log(
    imageName.parent_signature,
    imageName.photo,
    imageName.student_signature
  );

  const fetchAllDataImage = async () => {
    try {
      const parentSignaturePromise = axios.get(
        `https://go-event.online/file/${imageName.parent_signature}`,
        {
          headers: {
            Authorization: `Bearer ${checkToken}`,
          },
        }
      );

      const studentSignaturePromise = axios.get(
        `https://go-event.online/file/${imageName.student_signature}`,
        {
          headers: {
            Authorization: `Bearer ${checkToken}`,
          },
        }
      );

      const photoPromise = axios.get(
        `https://go-event.online/file/${imageName.photo}`,
        {
          headers: {
            Authorization: `Bearer ${checkToken}`,
          },
        }
      );

      const [parentSignatureResponse, studentSignatureResponse, photoResponse] =
        await axios.all([
          parentSignaturePromise,
          studentSignaturePromise,
          photoPromise,
        ]);

      const parentSignatureFile = parentSignatureResponse.data.data.file;
      const studentSignatureFile = studentSignatureResponse.data.data.file;
      const photoFile = photoResponse.data.data.file;

      setImageNameBase64({
        ...imageNameBase64,
        parent_signature: parentSignatureFile,
        student_signature: studentSignatureFile,
        photo: photoFile,
      });

      const handleImageFormatParentSig =
        imageName.parent_signature?.split(".").pop()?.trim() ?? "";
      setImageFormatParentSig(handleImageFormatParentSig);
      const handleImageFormatStudentSig =
        imageName.student_signature?.split(".").pop()?.trim() ?? "";
      setImageFormatStudentSig(handleImageFormatStudentSig);
      const handleImageFormatPhoto =
        imageName.photo?.split(".").pop()?.trim() ?? "";
      setImageFormatPhoto(handleImageFormatPhoto);
    } catch (error) {}
  };

  return (
    <div>
      <PDFViewer height={pdfViewerHeight} width="100%">
        <Document>
          <Page size="A4" style={styles.page}>
            <View
              style={{
                fontSize: "14px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  textAlign: "center",
                }}
              >
                <Text style={{ textAlign: "center" }}>{"Summary"}</Text>
                <Text style={{ textAlign: "center" }}>
                  {"New Student Admission Form"}
                </Text>
                <Text style={{ textAlign: "center" }}>{data.school_name}</Text>
              </View>
              <View>
                <Image
                  src={`data:image/${imageFormatPhoto};base64,${imageNameBase64.photo}`}
                  style={{ width: 50, height: 50 }}
                />
              </View>
            </View>
            <View style={styles.table}>
              <View key={id} style={styles.tableRow}>
                <View
                  style={[
                    {
                      backgroundColor: "#D8D8D8",
                      display: "flex",
                      width: "100%",
                      padding: "10px",
                      marginBottom: "5px",
                    },
                  ]}
                >
                  <Text>A. Student Datas</Text>
                </View>
              </View>
              <Row number={1} name="Full Name" data={data.student_data.name} />
              <Row
                number={2}
                name="Date Of Birth"
                data={data.student_data.place_date}
              />
              <Row number={3} name="Gender" data={data.student_data.gender} />
              <Row
                number={4}
                name="Religion"
                data={data.student_data.religion}
              />
              <Row
                number={5}
                name="Graduation From"
                data={data.student_data.graduation_from}
              />
              <Row number={6} name="NISN" data={data.student_data.nisn} />
              <RowAddress
                number={7}
                province={data.student_data.address.province}
                city={data.student_data.address.city}
                district={data.student_data.address.district}
                village={data.student_data.address.village}
                detail={data.student_data.address.detail}
                zipCode={data.student_data.address.zip_code}
              />
            </View>
            <View style={styles.table}>
              <View key={id} style={styles.tableRow}>
                <View
                  style={[
                    {
                      backgroundColor: "#D8D8D8",
                      display: "flex",
                      width: "100%",
                      padding: "10px",
                      marginBottom: "5px",
                    },
                  ]}
                >
                  <Text>B. Parent Datas</Text>
                </View>
              </View>
              <Row number={1} name="Full Name" data={data.parent_data.name} />
              <Row number={2} name="Profession" data={data.parent_data.job} />
              <Row number={3} name="Gender" data={data.parent_data.gender} />
              <RowAddress
                number={7}
                province={data.parent_data.address.province}
                city={data.parent_data.address.city}
                district={data.parent_data.address.district}
                village={data.parent_data.address.village}
                detail={data.parent_data.address.detail}
                zipCode={data.parent_data.address.zip_code}
              />
            </View>
            <View>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: "14px",
                  marginVertical: "3px",
                }}
              >
                {data.date_place}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  marginVertical: "3px",
                }}
              >
                Signature,
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    marginVertical: "3px",
                  }}
                >
                  Parent,
                </Text>
                <View>
                  <Image
                    source={`data:image/${imageFormatParentSig};base64,${imageNameBase64.parent_signature}`}
                    style={{ width: 100, height: 50 }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    marginVertical: "3px",
                  }}
                >
                  {data.parent_data.name}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    marginVertical: "3px",
                  }}
                >
                  Student,
                </Text>
                <View>
                  <Image
                    src={`data:image/${imageFormatStudentSig};base64,${imageNameBase64.student_signature}`}
                    style={{ width: 100, height: 50 }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    marginVertical: "3px",
                  }}
                >
                  {data.student_data.name}
                </Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PdfSubmission;
