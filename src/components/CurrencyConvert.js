import { useContext, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

// Context
import { CurrencyContext } from "../context/CurrencyContext";

// Styles
import styles from "../common/styles";
import style from "../css/CurrencyConvert";

// Components
import SelectDropdown from "react-native-select-dropdown";
import { useForm, Controller } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";
import ErrorMsg from "./ErrorMsg";
import Loading from "./Loading";

const CurrencyConvert = () => {
  // States
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState("");
  const [exchangeResult, setExchangeResult] = useState("");

  // Context
  const { errorMsg, location, currenciesRates, getCurrenciesRates } =
    useContext(CurrencyContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setBalance(input);
    setInput("");
    if (currenciesRates) {
      for (const key in currenciesRates) {
        if (key === toCurrency) {
          setExchangeResult((input * currenciesRates[key]).toFixed());
        }
      }
    }
  };

  useEffect(() => {
    if (location) setFromCurrency(location.currencyCode);
  }, [location]);

  useEffect(() => {
    getCurrenciesRates(fromCurrency);
  }, [fromCurrency, location]);

  const handleChange = (value) => {
    setInput(value);
  };

  return (
    <>
      {errorMsg ? (
        <ErrorMsg errorMsg={errorMsg} />
      ) : location ? (
        <View style={style.currencyConvertViewContainer}>
          <View style={style.dropDownsTextInputViewContainer}>
            <View
              style={{
                marginBottom: 15,
              }}
            >
              <View style={style.fromCurrencyDropInput}>
                <SelectDropdown
                  data={
                    currenciesRates &&
                    Object.keys(currenciesRates)
                      .sort((a, b) => (a > b ? 1 : -1))
                      .filter(
                        (value, index, self) =>
                          index === self.findIndex((t) => t === value)
                      )
                  }
                  onSelect={(selectedItem) => {
                    setFromCurrency(selectedItem);
                  }}
                  defaultValue={
                    location ? location.currencyCode : "Select Currency"
                  }
                  defaultButtonText={
                    location ? location.currencyCode : "Select Currency"
                  }
                  search
                  searchPlaceHolder="Currency name"
                  showsVerticalScrollIndicator={true}
                  buttonStyle={{
                    borderColor: styles.backgroundPrimaryColor,
                    ...style.dropDownBtnStyle,
                  }}
                  buttonTextStyle={style.dropDownBtnTextStyle}
                  dropdownIconPosition="right"
                />
                <Controller
                  control={control}
                  rules={{
                    required: "Please enter balance to convert",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={style.fromCurrencyTextInputStyle}
                      placeholder="Enter currency to change"
                      keyboardType="numeric"
                      value={input}
                      onChangeText={(value) => {
                        handleChange(value);
                        onChange(value);
                      }}
                    ></TextInput>
                  )}
                  name="currencyToChange"
                />
              </View>
              {errors.currencyToChange && (
                <Text style={style.errorMsgText}>
                  {errors.currencyToChange.message}
                </Text>
              )}
            </View>

            <View style={{ marginBottom: 15 }}>
              <Controller
                control={control}
                name="toCurrency"
                rules={{
                  required: "Please enter country to convert to",
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectDropdown
                    data={
                      currenciesRates &&
                      Object.keys(currenciesRates)
                        .sort((a, b) => (a > b ? 1 : -1))
                        .filter(
                          (value, index, self) =>
                            index === self.findIndex((t) => t === value)
                        )
                    }
                    onSelect={(selectedItem) => {
                      setToCurrency(selectedItem);
                      onChange(selectedItem);
                    }}
                    defaultValue={"Select Currency"}
                    defaultButtonText={"Select Currency"}
                    search
                    searchPlaceHolder="Currency name"
                    showsVerticalScrollIndicator={true}
                    buttonStyle={{
                      ...style.toCurrencyDropDown,
                      borderColor: styles.backgroundPrimaryColor,
                    }}
                    buttonTextStyle={style.dropDownBtnTextStyle}
                    dropdownIconPosition="right"
                  />
                )}
              />
              {errors.toCurrency && (
                <Text style={style.errorMsgText}>
                  {errors.toCurrency.message}
                </Text>
              )}
            </View>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={style.converCurrBtnStyle}
            >
              <Text style={style.converCurrBtnTextStyle}>Convert Currency</Text>
            </Pressable>
          </View>

          {exchangeResult && (
            <LinearGradient
              // Button Linear Gradient
              colors={[styles.mainColor, "#ff8456"]}
              style={style.linearGradStyle}
            >
              <Text style={style.linearGradTextStyle}>
                {balance} {fromCurrency} is {exchangeResult} {toCurrency}
              </Text>
            </LinearGradient>
          )}
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CurrencyConvert;
