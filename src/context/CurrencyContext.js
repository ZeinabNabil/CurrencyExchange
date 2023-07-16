// Hooks
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import * as Location from "expo-location";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [locationCurrency, setLocationCurrency] = useState(null);
  const [locationCurrencyCode, setLocationCurrencyCode] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setAllFilteredCountries] = useState(null);
  const [currencyNames, setCurrencyNames] = useState(null);
  const [currencyCodes, setCurrencyCodes] = useState(null);
  const [currenciesRates, setCurrenciesRates] = useState(null);
  const [rates, setRates] = useState(null);
  const [dates, setDates] = useState(null);

  useEffect(() => {
    let detectedLocation = "";
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Permission to access location was denied, please open location!"
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      await axios
        .get(
          `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${location.coords.latitude}&lng=${location.coords.longitude}&username=zeinabnabil`
        )
        .then((response) => {
          detectedLocation = response.data["geonames"]
            .map(({ countryName }) => countryName)
            .join("");
          setLocation(detectedLocation);
        })
        .catch((error) => {
          console.warn(error);
        });
      await axios
        .get("https://api.currencyfreaks.com/v2.0/supported-currencies")
        .then((response) => {
          let countries = response.data["supportedCurrenciesMap"];
          setAllCountries(
            Object.values(countries)
              .sort((a, b) => (a.countryName > b.countryName ? 1 : -1))
              .filter(
                (value, index, self) =>
                  index ===
                  self.findIndex((t) => t.countryName === value.countryName)
              )
          );
          setAllFilteredCountries(
            Object.values(countries)
              .sort((a, b) => (a.countryName > b.countryName ? 1 : -1))
              .filter(
                (value, index, self) =>
                  index ===
                  self.findIndex((t) => t.countryName === value.countryName)
              )
          );
          setCurrencyNames(
            Object.values(countries)
              .map(({ currencyName }) => currencyName)
              .sort((a, b) => (a > b ? 1 : -1))
              .filter(
                (value, index, self) =>
                  index === self.findIndex((t) => t === value)
              )
          );
          setCurrencyCodes(
            Object.values(countries)
              .map(({ currencyCode }) => currencyCode)
              .sort((a, b) => (a > b ? 1 : -1))
              .filter(
                (value, index, self) =>
                  index === self.findIndex((t) => t === value)
              )
          );
          setLocation(
            ...Object.values(countries).filter(
              ({ countryName }) => countryName === detectedLocation
            )
          );
        })
        .catch((error) => console.log(error));
    })();
  }, []);

  const handleChart = (base, to, startDate, endDate) => {
    axios
      .get(
        `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${base}`
      )
      .then((response) => {
        setRates(Object.values(response.data["rates"]).map((rate) => rate[to]));
        setDates(Object.keys(response.data["rates"]));
      })
      .catch((error) => console.log(error));
  };

  const getCurrenciesRates = async (location) => {
    await axios
      .get(
        `https://v6.exchangerate-api.com/v6/027f7a5e9b897282df7beed4/latest/${location}`
      )
      .then((response) => {
        setCurrenciesRates(response.data["conversion_rates"]);
      })
      .catch((error) => console.log(error));
  };

  const values = {
    location,
    allCountries,
    filteredCountries,
    setAllFilteredCountries,
    setLocation,
    currencyNames,
    currencyCodes,
    locationCurrency,
    setLocationCurrency,
    locationCurrencyCode,
    setLocationCurrencyCode,
    currenciesRates,
    getCurrenciesRates,
    rates,
    dates,
    handleChart,
    errorMsg,
  };

  return (
    <CurrencyContext.Provider value={values}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
