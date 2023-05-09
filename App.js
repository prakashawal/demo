import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/HomeScreen";
import IndicatorScreen from "./src/screens/IndicatorScreen";
import HeaderBarAnimationScreen from "./src/screens/HeaderBarAnimationScreen";
import SVGPathAnimationScreen from "./src/screens/SVGPathAnimationScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerTitle: "React Native Animations" }}
          name="home"
          component={HomeScreen}
        />
        {/* Animation Screens  */}
        <Stack.Screen
          options={{ headerTitle: "Indicator animation" }}
          name="indicator"
          component={IndicatorScreen}
        />
        <Stack.Screen
          options={{ headerTitle: "Header bar animation" }}
          name="headerBar"
          component={HeaderBarAnimationScreen}
        />
        <Stack.Screen
          options={{ headerTitle: "SVG path animation" }}
          name="svgPath"
          component={SVGPathAnimationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
