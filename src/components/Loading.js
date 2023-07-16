import { HStack, Heading, Spinner } from "native-base";
import { View } from "react-native";
import styles from "../common/styles";
import style from "../css/Loading";

const Loading = () => {
  return (
    <View style={style.loadingViewContainer}>
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color={styles.secondaryColor} fontSize="md">
          Loading
        </Heading>
      </HStack>
    </View>
  );
};

export default Loading;
