import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";

// Fetching data
import axios from "axios";

// Styles
import styles from "../common/styles";
import style from "../css/Home";
import ErrorMsg from "./ErrorMsg";

// Icons
import IonIcon from "react-native-vector-icons/Ionicons";

// uuid
import uuid from "react-native-uuid";

// Components
import { CurrencyContext } from "../context/CurrencyContext";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "./Loading";

const Home = () => {
  // States
  const [ratesAndDates, setRatesAndDates] = useState("");
  const [compare, setCompare] = useState("KWD");
  const {
    errorMsg,
    location,
    allCountries,
    filteredCountries,
    setAllFilteredCountries,
    setLocation,
    setLocationCurrency,
    setLocationCurrencyCode,
  } = useContext(CurrencyContext);
  const [input, setInput] = useState("");

  // handle input change
  const handleChange = (value) => {
    setInput(value);
    setAllFilteredCountries(
      allCountries &&
        allCountries.filter(
          (country) =>
            country.countryName != null &&
            country.countryName != "Global" &&
            country.countryName.toLowerCase().includes(value.toLowerCase())
        )
    );
  };

  // Get rates and dates of today and yesterday
  useEffect(() => {
    const currentDate = new Date();
    let prevDate = new Date();
    prevDate.setDate(currentDate.getDate() - 1);
    if (location) {
      axios
        .get(
          `https://api.exchangerate.host/timeseries?start_date=${prevDate
            .toJSON()
            .slice(0, 10)}&end_date=${currentDate.toJSON().slice(0, 10)}&base=${
            location.currencyCode
          }`
        )
        .then((response) => {
          Object.values(response.data["rates"])
            // .map((rate) => rate[compare])
            .map((rate, index) => {
              setRatesAndDates((prev) => [
                ...prev,
                {
                  rate: rate[compare],
                  date: Object.keys(response.data["rates"])[index],
                },
              ]);
            });
        })
        .catch((error) => console.log(error));
    }
  }, [location, compare]);

  return (
    <>
      {errorMsg ? (
        <ErrorMsg errorMsg={errorMsg} />
      ) : location ? (
        <>
          <View style={{ padding: 20 }}>
            <View style={style.locationViewContainer}>
              <IonIcon
                name="location"
                size={25}
                color={styles.secondaryColor}
                style={{ marginRight: 5 }}
              />
              <Text style={style.currentLocationText}>
                Your current location is
                <Text style={{ color: styles.secondaryColor }}>
                  {" "}
                  {location.countryName}
                </Text>
              </Text>
            </View>
            <View
              style={{
                paddingTop: 20,
              }}
            >
              {ratesAndDates &&
                ratesAndDates
                  .map((r) => (
                    <LinearGradient
                      key={uuid.v4()}
                      colors={[styles.mainColor, "#ff8456"]}
                      style={style.linearGradStyle}
                    >
                      <View style={style.compareCurrViewContainer}>
                        <Text style={style.compareCurrText}>
                          1 {location.currencyCode}
                        </Text>
                        <Text style={style.compareCurrText}>
                          {r.rate} {compare}
                        </Text>
                      </View>
                      <Text
                        style={{
                          alignSelf: "flex-end",
                          color: "#0000006b",
                          fontWeight: "bold",
                        }}
                      >
                        {r.date}
                      </Text>
                    </LinearGradient>
                  ))
                  .slice(ratesAndDates.length - 2, ratesAndDates.length)}
            </View>
            <TextInput
              style={style.filterCountriesTextInput}
              placeholder="Search for specific country"
              keyboardType="default"
              value={input}
              onChangeText={handleChange}
            ></TextInput>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            style={style.flatListStyle}
            data={filteredCountries}
            renderItem={({ item }) => (
              <View style={style.countriesViewContainer}>
                <View style={style.countryViewContainer}>
                  {item.icon != null && (
                    <Image
                      source={{ uri: item.icon }}
                      style={{ width: 35, height: 35 }}
                    ></Image>
                  )}
                  <Text style={style.countryNameText}>{item.countryName}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setLocation(item);
                      setLocationCurrency(item.currencyName);
                      setLocationCurrencyCode(item.currencyCode);
                      setInput("");
                      setAllFilteredCountries(allCountries);
                    }}
                    style={{
                      ...style.locCompBtnsStyle,
                      backgroundColor: styles.mainColor,
                      marginRight: 5,
                    }}
                  >
                    <IonIcon name="location" size={20} color="white" />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setCompare(item.currencyCode);
                      setInput("");
                      setAllFilteredCountries(allCountries);
                    }}
                    style={{
                      ...style.locCompBtnsStyle,
                      backgroundColor: styles.secondaryColor,
                    }}
                  >
                    <IonIcon name="git-compare" size={20} color="white" />
                  </Pressable>
                </View>
              </View>
            )}
            keyExtractor={(data) => uuid.v4()}
          ></FlatList>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
