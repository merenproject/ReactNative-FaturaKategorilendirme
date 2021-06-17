import React, { useEffect } from "react";

import { HomeScreen } from "../features/Home/home.screen";
import { CameraScreen } from "../features/Camera/camera";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const HomeStack = createStackNavigator();

export const HomeScreenNavigator = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <HomeStack.Screen
        options={{
          header: () => null,
        }}
        name="Anasayfa"
        component={HomeScreen}
      />
      <HomeStack.Screen name="Kamera" component={CameraScreen} />
    </HomeStack.Navigator>
  );
};
