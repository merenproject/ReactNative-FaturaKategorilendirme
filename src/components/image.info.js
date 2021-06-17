import React, { useState, useCallback, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { Card, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const ImageCard = styled(Card)`
  background-color: yellow;
`;

const ImageCardCover = styled(Card.Cover)`
  padding: 16px;
  background-color: blue;
  height: 400;
`;

const ImageActions = styled(Card.Actions)`
  background-color: white;
  justify-content: flex-end;
  flex: 1;
`;

export const ImageInfoCard = ({ images = {}, photos2, keys }) => {
  //const { photos } = useContext(CameraContext);
  const {
    name = "Test Image",
    image = [
      "https://i.picsum.photos/id/834/536/354.jpg?hmac=UwQ9p69VvvqcV3MRXaxr4XtnjjptvUaJ2_lc9GpS_rY",
    ],
  } = images;
  /*
  const [photo, setPhoto] = useState([]);
  const getProfilePicture = async () => {
    const photoUri = await AsyncStorage.getItem("user-photo");
    setPhoto(photoUri);
  };
  useFocusEffect(
    useCallback(() => {
      getProfilePicture();
    }, [])
  );
  console.log(photo);*/

  //console.log(imager.value.uri);
  //console.log(photos2);
  return (
    <View
      style={{
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 32,
      }}
    >
      <ImageCard elevation={5}>
        <ImageCardCover
          key={keys}
          source={{
            uri: photos2,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "#ff5733",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text>Test Text</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              flex: 1,
              backgroundColor: "#39ff33",
            }}
          >
            <Button icon="delete" labelStyle={{ fontSize: 20 }}>
              SİL
            </Button>
          </View>
        </View>
      </ImageCard>
    </View>
  );
};
