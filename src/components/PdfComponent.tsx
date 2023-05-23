import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { FC } from "react";

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    fontSize: "14px",
    marginVertical: "2px",
  },
  column1: {
    width: "40px", // Column 1 width (adjust as needed)
    alignItems: "center", // Align content vertically in the middle
    textAlign: "center",
  },
  column2: {
    width: "150px", // Column 2 width (adjust as needed)
  },
  column3: {
    width: "250px", // Column 3 width (adjust as needed)
  },
  column4: {
    flex: 4, // Column 4 width (adjust as needed)
  },
});

interface Props {
  number: number;
  name: string;
  data: string | number | any;
}

interface PropsAddress {
  number: number;
  province: string;
  city: string;
  district: string;
  village: string;
  detail: string;
  zipCode: string;
}

export const Row: FC<Props> = (props) => {
  const { number, name, data } = props;
  return (
    <View style={styles.tableRow}>
      <View style={styles.column1}>
        <Text>{number}.</Text>
      </View>
      <View style={styles.column2}>
        <Text>{name}</Text>
      </View>
      <View style={styles.column3}>
        <Text>: {data}</Text>
      </View>
    </View>
  );
};

export const RowAddress: FC<PropsAddress> = (props) => {
  const { number, province, city, district, village, detail, zipCode } = props;
  return (
    <>
      <View style={styles.tableRow}>
        <View style={styles.column1}>
          <Text>{number}.</Text>
        </View>
        <View style={styles.column2}>
          <Text>Address</Text>
        </View>
        <View style={styles.column3}>
          <Text>: - Province : {province}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.column1}>
          <Text></Text>
        </View>
        <View style={styles.column2}>
          <Text></Text>
        </View>
        <View style={styles.column3}>
          <Text>&nbsp; - City : {city}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.column1}>
          <Text></Text>
        </View>
        <View style={styles.column2}>
          <Text></Text>
        </View>
        <View style={styles.column3}>
          <Text>&nbsp; - District : {district}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.column1}>
          <Text></Text>
        </View>
        <View style={styles.column2}>
          <Text></Text>
        </View>
        <View style={styles.column3}>
          <Text>&nbsp; - Village : {village}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.column1}>
          <Text></Text>
        </View>
        <View style={styles.column2}>
          <Text></Text>
        </View>
        <View style={styles.column3}>
          <Text>&nbsp; - Detail : </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.column1}>
          <Text></Text>
        </View>
        <View style={styles.column2}>
          <Text></Text>
        </View>
        <View style={[styles.column3, { marginLeft: "16px" }]}>
          <Text>{detail}</Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={styles.column1}>
          <Text></Text>
        </View>
        <View style={styles.column2}>
          <Text></Text>
        </View>
        <View style={styles.column3}>
          <Text>&nbsp; - Zip Code : {zipCode}</Text>
        </View>
      </View>
    </>
  );
};
