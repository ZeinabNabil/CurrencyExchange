import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcon from "react-native-vector-icons/Ionicons";
import routes from "../common/routes";
import Home from "../components/Home";
import styles from "../common/styles";
import CurrencyConvert from "../components/CurrencyConvert";
import Charts from "../components/Charts";
import LogoTitle from "./LogoTitle";

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Root = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { paddingTop: 10, paddingBottom: 10, height: 60 },
      }}
    >
      <Tab.Screen
        name={routes.home}
        component={Home}
        options={{
          headerTitle: () => <LogoTitle />,
          tabBarLabel: "Home",
          // headerShown: false,
          tabBarActiveTintColor: styles.mainColor,
          tabBarInactiveTintColor: styles.secondaryColor,
          tabBarLabelStyle: {
            fontSize: 11,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            iconName = focused ? "home" : "home-outline";
            return <IonIcon name={iconName} size={24} color={color} />;
          },
          tabBarIconStyle: {
            paddingTop: 3,
          },
        }}
      />
      <Tab.Screen
        name={routes.convert}
        component={CurrencyConvert}
        options={{
          headerTitle: () => <LogoTitle />,
          tabBarLabel: "Convert",
          // headerShown: false,
          tabBarActiveTintColor: styles.mainColor,
          tabBarInactiveTintColor: styles.secondaryColor,
          tabBarLabelStyle: {
            fontSize: 11,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            iconName = focused ? "cash" : "cash-outline";
            return <IonIcon name={iconName} size={24} color={color} />;
          },
          tabBarIconStyle: {
            paddingTop: 3,
          },
        }}
      />
      <Tab.Screen
        name={routes.charts}
        component={Charts}
        options={{
          headerTitle: () => <LogoTitle />,
          tabBarLabel: "Charts",
          // headerShown: false,
          tabBarActiveTintColor: styles.mainColor,
          tabBarInactiveTintColor: styles.secondaryColor,
          tabBarLabelStyle: {
            fontSize: 11,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            iconName = focused ? "bar-chart" : "bar-chart-outline";
            return <IonIcon name={iconName} size={24} color={color} />;
          },
          tabBarIconStyle: {
            paddingTop: 3,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Root;
