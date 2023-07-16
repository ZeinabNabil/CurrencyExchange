import { StyleSheet } from "react-native";
import styles from "../common/styles";

export default StyleSheet.create({
  locationViewContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  currentLocationText: {
    fontSize: 20,
    fontWeight: "bold",
    // textAlign: "center",
    // color: "white",
  },
  linearGradStyle: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  compareCurrViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  compareCurrText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  filterCountriesTextInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 18,
    marginTop: 10,
    width: "100%",
  },
  flatListStyle: {
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  countriesViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  countryViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  countryNameText: {
    marginLeft: 8,
    fontSize: 17,
    fontWeight: "500",
    width: 200,
  },
  locCompBtnsStyle: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  
});
