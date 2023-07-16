import { useContext, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

// Styles
import styles from "../common/styles";

// Components
import { LineChart } from "react-native-chart-kit";
import { CurrencyContext } from "../context/CurrencyContext";
import { Controller, useForm } from "react-hook-form";
import SelectDropdown from "react-native-select-dropdown";
import ErrorMsg from "./ErrorMsg";
import style from "../css/Charts";
import Loading from "./Loading";

const Charts = () => {
  // States
  const [firstCurrency, setFirstCurrency] = useState("");
  const [secondCurrency, setSecondCurrency] = useState("");
  const currentDate = new Date();
  let prevDate = new Date();

  // Context
  const { rates, dates, handleChart, currencyCodes, errorMsg, location } =
    useContext(CurrencyContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    prevDate.setMonth(currentDate.getMonth() - 1);
    handleChart(
      firstCurrency,
      secondCurrency,
      prevDate.toJSON().slice(0, 10),
      currentDate.toJSON().slice(0, 10)
    );
  };

  return (
    <>
      {errorMsg ? (
        <ErrorMsg />
      ) : location ? (
        <View>
          <View style={style.chartsFormViewContiner}>
            <View style={{ marginBottom: 15 }}>
              <Text style={style.labelTextStyle}>Choose First Currency</Text>
              <Controller
                control={control}
                name="firstCurrency"
                rules={{
                  required: "Please enter first Currency",
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectDropdown
                    data={currencyCodes && currencyCodes}
                    onSelect={(selectedItem) => {
                      setFirstCurrency(selectedItem);
                      onChange(selectedItem);
                    }}
                    defaultValue={"Select Currency"}
                    defaultButtonText={"Select Currency"}
                    search
                    searchPlaceHolder="Currency name"
                    showsVerticalScrollIndicator={true}
                    buttonStyle={style.dropDownBtnStyle}
                    buttonTextStyle={style.dropDownBtnTextStyle}
                    dropdownIconPosition="right"
                  />
                )}
              />
              {errors.firstCurrency && (
                <Text style={style.errorMsgText}>
                  {errors.firstCurrency.message}
                </Text>
              )}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={style.labelTextStyle}>Choose Second Currency</Text>
              <Controller
                control={control}
                name="secondCurrency"
                rules={{
                  required: "Please enter second currency",
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectDropdown
                    data={currencyCodes && currencyCodes}
                    onSelect={(selectedItem) => {
                      setSecondCurrency(selectedItem);
                      onChange(selectedItem);
                    }}
                    defaultValue={"Select Currency"}
                    defaultButtonText={"Select Currency"}
                    search
                    searchPlaceHolder="Currency name"
                    showsVerticalScrollIndicator={true}
                    buttonStyle={style.dropDownBtnStyle}
                    buttonTextStyle={style.dropDownBtnTextStyle}
                    dropdownIconPosition="right"
                  />
                )}
              />
              {errors.secondCurrency && (
                <Text style={style.errorMsgText}>
                  {errors.secondCurrency.message}
                </Text>
              )}
            </View>
            <Pressable
              onPress={handleSubmit(onSubmit)}
              style={style.viewChartBtnStyle}
            >
              <Text style={style.viewChartBtnTextStyle}>View Chart</Text>
            </Pressable>
          </View>
          <View>
            {rates && dates ? (
              <View>
                <View style={style.datesBtnsViewContainer}>
                  <Pressable
                    onPress={() => {
                      prevDate.setMonth(currentDate.getMonth() - 1);
                      handleChart(
                        firstCurrency,
                        secondCurrency,
                        prevDate.toJSON().slice(0, 10),
                        currentDate.toJSON().slice(0, 10)
                      );
                    }}
                    style={style.dateBtnStyle}
                  >
                    <Text style={style.dateBtnTextStyle}>1 M</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      prevDate.setMonth(currentDate.getMonth() - 3);
                      handleChart(
                        firstCurrency,
                        secondCurrency,
                        prevDate.toJSON().slice(0, 10),
                        currentDate.toJSON().slice(0, 10)
                      );
                    }}
                    style={style.dateBtnStyle}
                  >
                    <Text style={style.dateBtnTextStyle}>3 M</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      prevDate.setFullYear(currentDate.getFullYear() - 1);
                      handleChart(
                        firstCurrency,
                        secondCurrency,
                        prevDate.toJSON().slice(0, 10),
                        currentDate.toJSON().slice(0, 10)
                      );
                    }}
                    style={style.dateBtnStyle}
                  >
                    <Text style={style.dateBtnTextStyle}>1 Y</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      prevDate.setFullYear(currentDate.getFullYear() - 5);
                      handleChart(
                        firstCurrency,
                        secondCurrency,
                        prevDate.toJSON().slice(0, 10),
                        currentDate.toJSON().slice(0, 10)
                      );
                    }}
                    style={style.dateBtnStyle}
                  >
                    <Text style={style.dateBtnTextStyle}>5 Y</Text>
                  </Pressable>
                </View>
                <LineChart
                  data={{
                    // labels: dates.slice(0, Math.floor(Math.random()) + 5),
                    datasets: [
                      {
                        data: rates
                          .filter((rate) => rate !== "undefined")
                          .slice(0, Math.floor(Math.random() * 30) + 30),
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width}
                  height={220}
                  chartConfig={{
                    backgroundColor: styles.mainColor,
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 3,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 5,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726",
                    },
                  }}
                  bezier
                  style={{
                    borderRadius: 16,
                  }}
                />
              </View>
            ) : (
              ""
            )}
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Charts;
