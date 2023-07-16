import { StyleSheet } from "react-native";
import styles from "../common/styles";

export default StyleSheet.create({
  chartsFormViewContiner: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 15,
    padding: 15,
  },
  labelTextStyle: {
    marginBottom: 10,
    color: styles.secondaryColor,
    fontSize: 15,
    fontWeight: "600",
  },
  dropDownBtnStyle: {
    borderWidth: 1,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    height: 40,
    borderColor: styles.backgroundPrimaryColor,
  },
  dropDownBtnTextStyle: {
    textAlign: "center",
    fontSize: 16,
  },
  errorMsgText: { color: "red", marginTop: 5 },
  viewChartBtnStyle: {
    backgroundColor: styles.secondaryColor,
    paddingVertical: 10,
    borderRadius: 10,
  },
  viewChartBtnTextStyle: { textAlign: "center", color: "white", fontSize: 16 },
  datesBtnsViewContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dateBtnStyle: {
    backgroundColor: styles.secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  dateBtnTextStyle: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
});
