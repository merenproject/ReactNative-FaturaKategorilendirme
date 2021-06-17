import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";

import { HomeScreenNavigator } from "./home.screen.navigator";
import { ElectricityScreen } from "../features/ElectricityBill/electricity.screen";
import { WaterScreen } from "../features/WaterBill/water.screen";
import { GasScreen } from "../features/GasBill/gas.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Anasayfa: "home",
  Elektrik: "flash",
  Su: "water",
  Doğalgaz: "bonfire",
};
/////////////////////////////////////////
const tabBarIcon =
  // parametre


    (iconName) =>
    ({ size, color }) => {
      return <Ionicons name={iconName} size={size} color={color} />;
    };
const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: tabBarIcon(iconName),

    // Alternatif (const tabBarIcon kullanmadan)
    // tabBarIcon: ({size, color}) => (
    //   <Ionicons name={iconName} size={size} color={color} />
    // ),
  };
};

////////////////////////////////////////// 145.
export const NavigationMain = () => (
  //Mount unmount olması için navigatore aldık (account screenden ayırmak için) eskiden app.js deydi.//
  //Böylece unmount ederek asnc storagei sıfırlamış olduk yeni user için varolan favoritelere ekleme yapmadı//
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Anasayfa" component={HomeScreenNavigator} />
      <Tab.Screen name="Elektrik" component={ElectricityScreen} />
      <Tab.Screen name="Su" component={WaterScreen} />
      <Tab.Screen name="Doğalgaz" component={GasScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
