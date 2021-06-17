import React from "react";

import styled from "styled-components/native";

import { SafeArea } from "../../components/safe.area";

import { View, Text } from "react-native";

import { Button } from "react-native-paper";

import { CameraScreen } from "../Camera/camera";

import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeBackground = styled.ImageBackground.attrs({
  source: require("../../../assets/home-background2.webp"),
})`
  flex: 1;
  align_items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 30px;
`;

const HomeCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

const HomeContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 32px;
  margin-top: 16px;
`;

const HomeButton = styled(Button).attrs({
  color: "darkcyan",
})`
  padding: 16px;
`;

export const HomeScreen = ({ navigation }) => {
  //AsyncStorage.clear();
  return (
    <SafeArea>
      <HomeBackground>
        <HomeCover />
        <Title>Fatura Kategorilendirme</Title>
        <HomeContainer>
          <HomeButton
            icon="camera"
            mode="contained"
            onPress={() => navigation.navigate("Kamera")}
          >
            Yeni Foto
          </HomeButton>
        </HomeContainer>
      </HomeBackground>
    </SafeArea>
  );
};
