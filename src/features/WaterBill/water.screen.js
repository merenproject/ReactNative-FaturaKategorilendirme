import React, { useEffect, useState, useCallback } from "react";

import styled from "styled-components/native";

import { FlatList } from "react-native";

import { ImageInfoCard } from "../../components/image.info";

import { View, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";

import { useIsFocused } from "@react-navigation/native";
import { SafeArea } from "../../components/safe.area";

const ImageList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
const DATA2 = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    uri: "https://i.picsum.photos/id/834/536/354.jpg?hmac=UwQ9p69VvvqcV3MRXaxr4XtnjjptvUaJ2_lc9GpS_rY",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    uri: "https://i.picsum.photos/id/834/536/354.jpg?hmac=UwQ9p69VvvqcV3MRXaxr4XtnjjptvUaJ2_lc9GpS_rY",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    uri: "https://i.picsum.photos/id/834/536/354.jpg?hmac=UwQ9p69VvvqcV3MRXaxr4XtnjjptvUaJ2_lc9GpS_rY",
  },
];

import { Value } from "react-native-reanimated";

export const WaterScreen = ({ navigation }) => {
  const [waterPhotos, updateWaterPhotosArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  //const photos = JSON.stringify(photo);
  //const [photosArr, setPhotos] = useState([]);

  //const addPhoto = (newPhoto) => {
  //setPhotos([photos, ...photosArr]);
  //};
  //addPhoto(photos);
  const isFocused = useIsFocused();

  const loadPhotosWater = async () => {
    try {
      const value = await AsyncStorage.getItem("photo-object-s");
      if (value !== null) {
        console.log("valuedetected");
        updateWaterPhotosArray(JSON.parse(value));
      }
      console.log("no value");
    } catch (e) {
      console.log("error loading", e);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadPhotosWater();
      setTimeout(() => {
        isLoading();
      }, 1500);
      console.log("inloadeffectfocused", isFocused);
    }
    setIsLoaded(false);
    console.log("inloadeffectUnfocused", isFocused);
  }, [isFocused]);

  const isLoading = () => setIsLoaded(true);

  const DATA = [
    {
      width: 480,
      uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540erenm20%252FFaturaKategorilendirme/Camera/870404c0-e13e-4022-8b47-c45e0ace5615.jpg",
      height: 720,
    },
    {
      width: 480,
      uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540erenm20%252FFaturaKategorilendirme/Camera/74ed5e57-1b3e-4cc3-9ed5-9e17c689ca8d.jpg",
      height: 720,
    },
    {
      width: 480,
      uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540erenm20%252FFaturaKategorilendirme/Camera/38b63c33-e88f-4f6e-b9a6-c4df11105225.jpg",
      height: 720,
    },
    {
      width: 480,
      uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540erenm20%252FFaturaKategorilendirme/Camera/857d1b1b-7d58-4599-b324-4d35b857d75a.jpg",
      height: 720,
    },
  ];

  //console.log({ electirictyPhotos });

  /*
  const renderItem = ({ item }) => (
    <ImageInfoCard photos2={item.uri} keys={item.uri} />
  );
*/

  const renderItem = ({ item }) => <ImageInfoCard photos2={item.uri} />;
  //isLoaded activity indicator (yüklenme simgesi) TO DO//
  //open image TO DO//
  //delete image TO DO//
  //Page Top Header TO DO//

  return (
    <SafeArea>
      {isLoaded && (
        <FlatList
          data={waterPhotos}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
        />
      )}
    </SafeArea>
  );
};
