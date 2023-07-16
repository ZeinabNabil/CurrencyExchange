import { StyleSheet } from "react-native";
import styles from "../common/styles";

export default StyleSheet.create({
  currencyConvertViewContainer: { justifyContent: "center", height: "100%" },
  dropDownsTextInputViewContainer: {
    backgroundColor: "white",
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 15,
  },
  fromCurrencyDropInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropDownBtnStyle: {
    borderWidth: 1,
    backgroundColor: "white",
    width: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 40,
  },
  dropDownBtnTextStyle: {
    textAlign: "center",
    fontSize: 16,
  },
  fromCurrencyTextInputStyle: {
    borderWidth: 1,
    borderColor: "#CCC",
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 18,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
  },
  errorMsgText: { color: "red", marginTop: 5 },
  toCurrencyDropDown: {
    borderWidth: 1,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    height: 40,
  },
  converCurrBtnStyle: {
    backgroundColor: styles.secondaryColor,
    paddingVertical: 10,
    borderRadius: 10,
  },
  converCurrBtnTextStyle: { textAlign: "center", color: "white", fontSize: 16 },
  linearGradStyle: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    padding: 15,
  },
  linearGradTextStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
