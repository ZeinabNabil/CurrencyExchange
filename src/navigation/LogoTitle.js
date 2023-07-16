import { View } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import styles from "../common/styles";

const LogoTitle = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IonIcon name="cash-outline" size={24} color={styles.mainColor} />
      <Text
        style={{
          fontWeight: "bold",
          marginLeft: 5,
          fontSize: 22,
          color: styles.mainColor,
        }}
      >
        Currency Exchange
      </Text>
    </View>
  );
};

export default LogoTitle;
