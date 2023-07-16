import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";

import Root from "./src/navigation/Root";
import CurrencyProvider from "./src/context/CurrencyContext";

export default function App() {
  return (
    <CurrencyProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Root></Root>
        </NavigationContainer>
      </NativeBaseProvider>
    </CurrencyProvider>
  );
}
