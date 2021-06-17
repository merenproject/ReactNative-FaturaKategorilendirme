import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";

import * as FileSystem from "expo-file-system";

import Base64 from "Base64";

import * as ImageManipulator from "expo-image-manipulator";

import Environment from "../../../firebaseconfig/environment";

import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { View, TouchableOpacity, Text, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ImageInfoCard } from "../../components/image.info";

//export const CameraContext = createContext();

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const LoadingIcon = styled.ActivityIndicator`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CameraScreen = ({ children, navigation }) => {
  //const [photos, updatePhotosArray] = useState([]);
  const [ePhotos, updateEPhotosArray] = useState([]);
  const [sPhotos, updateSPhotosArray] = useState([]);
  const [dPhotos, updateDPhotosArray] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [found, setFound] = useState(false);

  const [photoSelected, setPhotoSelected] = useState(null);

  //const [confirm, setConfirm] = useState(false);

  //const [newPhoto, setPhoto] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      //AsyncStorage.setItem("@user-photo", photo.uri);
      // updatePhotosArray((arr) => [...arr, `${arr.length}`]);
      //setPhoto(photo);
      //sendPhoto(photo);

      //updatePhotosArray([photo, ...photos]);

      // setPhoto(photo);
      setFound(false);
      setIsLoading(true);
      encode(photo);

      //navigation.goBack();
      //navigation.navigate("Elektrik", { photo });
    }
    // Obje olarak photos
  };
  const AsyncTwoButtonAlert = (value1, value2, value3, value4) => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        `${value1}`,
        `${value2}`,

        [
          {
            text: `${value3}`,
            onPress: () => resolve("olumsuz"),
            style: "cancel",
          },
          { text: `${value4}`, onPress: () => resolve("olumlu") },
        ],

        { cancelable: false }
      );
    });
  };

  const savePhotos = async (value, selected) => {
    if (selected === "e") {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("photo-object-e", jsonValue);
        console.log("saved");
      } catch (e) {
        console.log("error storing", e);
      }
    }
    if (selected === "s") {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("photo-object-s", jsonValue);
        console.log("saved");
      } catch (e) {
        console.log("error storing", e);
      }
    }
    if (selected === "d") {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("photo-object-d", jsonValue);
        console.log("saved");
      } catch (e) {
        console.log("error storing", e);
      }
    }
  };

  useEffect(() => {
    console.log("in use effect");
    if (photoSelected === "e") {
      console.log("in E condition");
      savePhotos(ePhotos, photoSelected);
      //setIsLoading(false);
      navigation.goBack();
    }
    if (photoSelected === "s") {
      console.log("in S condition");
      savePhotos(sPhotos, photoSelected);
      //setIsLoading(false);
      navigation.goBack();
    }
    if (photoSelected === "d") {
      console.log("in D condition");
      savePhotos(dPhotos, photoSelected);
      //setIsLoading(false);
      navigation.goBack();
    }
    /*
    if (photoSelected === "retry") {
      console.log("retry condition");
      setIsLoading(false);
      
    }*/
  }, [photoSelected, ePhotos, sPhotos, dPhotos, navigation]);

  /*
  // UseState aync olduğu için (re renderda değeri değişiyior) useEffect ile değeri güncellemek gerekir.
  useEffect(() => {
    console.log(newPhoto);
  }, [newPhoto]);
*/
  //console.log(photos);
  ////////////////////////////////////////////////////////////////
  const loadPhotos = async () => {
    try {
      const valueE = await AsyncStorage.getItem("photo-object-e");
      const valueS = await AsyncStorage.getItem("photo-object-s");
      const valueD = await AsyncStorage.getItem("photo-object-d");
      if (valueE !== null) {
        console.log("E valuedetected");
        updateEPhotosArray(JSON.parse(valueE));
      }
      if (valueS !== null) {
        console.log("S valuedetected");
        updateEPhotosArray(JSON.parse(valueS));
      }
      if (valueD !== null) {
        console.log("D valuedetected");
        updateEPhotosArray(JSON.parse(valueD));
      }
      console.log("no value");
    } catch (e) {
      console.log("error loading", e);
    }
  };

  useEffect(() => {
    loadPhotos();

    console.log("inloadeffect");
  }, []);
  //////////////////////
  const encode = async (photoVal) => {
    const encodedPhoto = await ImageManipulator.manipulateAsync(
      photoVal.uri,
      [],
      {
        base64: true,
      }
    );

    submitToGoogle(encodedPhoto.base64, photoVal);
    //setPhoto(encodedPhoto);
    //console.log(`"${photoValue}"`);
    console.log("photo encoded");
  };
  ///////////////////////////////
  /*
  const encode = (photoEncode) => {
    var fs = require("fs");
    var imageFile = fs.readFileSync(`"${photoEncode}"`);
    var encodedPhoto = Buffer.from(imageFile).toString("base64");
    console.log(encodedPhoto);
  };
*/
  /*
  const encode = async (photoEncode) => {
    const encodedPhoto = await Base64.btoa(photoEncode);
    //const decodedPhoto = await Base64.atob(encodedPhoto);
    submitToGoogle(encodedPhoto);
    console.log("base64 uri  ", encodedPhoto);
  };
*/
  /*const addPhoto = (newPhoto) => {
    setPhotos((state) => [...state, newPhoto]);
  };
*/

  /*const getPhoto = async () => {
    const photoUri = await AsyncStorage.getItem(photo);
    setPhoto(photoUri);
  };
  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );
*/
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //////////////////////////////////////////////////////////

  const submitToGoogle = async (encodedPhotoValue, originalPhotoValue) => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [
              //  { type: "LABEL_DETECTION", maxResults: 10 },
              //  { type: "LANDMARK_DETECTION", maxResults: 5 },
              //  { type: "FACE_DETECTION", maxResults: 5 },
              //  { type: "LOGO_DETECTION", maxResults: 5 },
              //{ type: "TEXT_DETECTION", maxResults: 1 },
              { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
              //  { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
              //  { type: "IMAGE_PROPERTIES", maxResults: 5 },
              //  { type: "CROP_HINTS", maxResults: 5 },
              //  { type: "WEB_DETECTION", maxResults: 5 }
            ],
            image: {
              content: encodedPhotoValue,
            },
          },
        ],
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        }
      );
      let responseJson = await response.json();
      const response2 = responseJson.responses;
      //const arr1 = response2.map((e) => e.textAnnotations);
      ///////////////////////////////////////////////

      ///////////////////////////////////////////////
      //const arr2 = { ...arr1 };
      //const arr3 = arr2.description;
      console.log(JSON.stringify(responseJson));
      // Text Seçici //
      const filteredResponse = response2[0].textAnnotations.map(
        (e) => e.description
      );

      if (filteredResponse !== null) {
        //const istenenText = "Vision";
        const filteredArray = (array) => {
          array.find((e) => {
            switch (e) {
              case "ELEKTRİK":
              case "ELEKTRIK":
              case "ELEKTRİK FATURASİ":
              case "ELEKTRK FATURASI":
              case "ELEKTRİK FATURAS":
              case "ELEKTRİKFATURAS":
              case "ELEKTRK FATURAS":
              case "ELEKTRKFATURAS":
              case "ELEKTRİK FATURAS!":
              case "ELEKTRK FATURAS!":
              case "ELEKTRİKFATURAS!":
              case "ELEKTRKFATURAS!":
              case "ELEKTRIK FATURASI":
              case "ELEKTRİK FATURASI":
              case "ELEKTRIK FATURASİ":
              case "ELEKTRİKFATURASİ":
              case "ELEKTRKFATURASI":
              case "ELEKTRIKFATURASI":
              case "ELEKTRİKFATURASI":
              case "ELEKTRIKFATURASİ":
                console.log("ELEKTRİK BULUNDU");
                setFound(true);
                (async () => {
                  const userResponse = await AsyncTwoButtonAlert(
                    "ELEKTRİK FATURASI BULUNDU",
                    "Elektrik Faturası bulundu, kaydetmek istediğinize emin misiniz?",
                    "Tekrar Dene",
                    "KAYDET"
                  );

                  if (userResponse === "olumlu") {
                    updateEPhotosArray([originalPhotoValue, ...ePhotos]);
                    setPhotoSelected("e");
                  }
                  if (userResponse === "olumsuz") {
                    setIsLoading(false);
                  }
                  //console.log(ePhotos);
                  //savePhotos(ePhotos);
                  console.log(originalPhotoValue);
                })();
                break;

              case "SU":
              case "SU FATURASİ":
              case "SU FATURASI":
              case "SU FATURAS":
              case "SUFATURAS":
              case "SU FATURAS!":
              case "SU FATURAS!":
              case "SUFATURAS!":
              case "SUFATURAS!":
              case "SUFATURASİ":
              case "SUFATURASI":
                console.log("SU BULUNDU");
                setFound(true);
                (async () => {
                  const userResponse = await AsyncTwoButtonAlert(
                    "SU FATURASI BULUNDU",
                    "Su Faturası bulundu, kaydetmek istediğinize emin misiniz?",
                    "Tekrar Dene",
                    "KAYDET"
                  );

                  if (userResponse === "olumlu") {
                    updateSPhotosArray([originalPhotoValue, ...sPhotos]);
                    setPhotoSelected("s");
                  }
                  if (userResponse === "olumsuz") {
                    setIsLoading(false);
                  }
                  console.log(originalPhotoValue);
                })();
                break;

              case "DOGALGAZ":
              case "DOĞALGAZ":
              case "DOĞALĞAZ":
              case "DOGALGAZ FATURASİ":
              case "DOĞALGAZ FATURASİ":
              case "DOĞALĞAZ FATURASİ":
              case "DOĞALĞAZ FATURASI":
              case "DOĞALĞAZ FATURAS":
              case "DOĞALĞAZFATURAS":
              case "DOGALGAZ FATURASI":
              case "DOGALGAZ FATURAS":
              case "DOGALGAZFATURAS":
              case "DOĞALGAZ FATURASI":
              case "DOĞALGAZ FATURAS":
              case "DOĞALGAZFATURAS":
              case "DOGALGAZ FATURAS!":
              case "DOĞALGAZ FATURAS!":
              case "DOGALGAZFATURAS!":
              case "DOĞALGAZFATURAS!":
              case "DOGALGAZFATURASİ":
              case "DOĞALGAZFATURASİ":
              case "DOĞALĞAZFATURASİ":
              case "DOĞALĞAZFATURASI":
              case "DOGALGAZFATURASI":
              case "DOĞALGAZFATURASI":
                console.log("DOĞALGAZ BULUNDU");
                setFound(true);
                (async () => {
                  const userResponse = await AsyncTwoButtonAlert(
                    "DOĞALGAZ FATURASI BULUNDU",
                    "Doğalgaz Faturası bulundu, kaydetmek istediğinize emin misiniz?",
                    "Tekrar Dene",
                    "KAYDET"
                  );

                  if (userResponse === "olumlu") {
                    updateDPhotosArray([originalPhotoValue, ...dPhotos]);
                    setPhotoSelected("d");
                  }
                  if (userResponse === "olumsuz") {
                    setIsLoading(false);
                  }
                  console.log(originalPhotoValue);
                })();
                break;

              default:
                if (!found) {
                  const userResponse = AsyncTwoButtonAlert(
                    "FATURA BULUNAMADI",
                    "Fatura bulunamadı lütfen tekrar deneyiniz.",
                    "Çıkış",
                    "TEKRAR DENE"
                  );
                  if (userResponse === "olumlu") {
                    setIsLoading(false);
                  }
                  if (userResponse === "olumsuz") {
                    navigation.goBack();
                  }

                  console.log("DEĞER BULUNAMADI");
                }
            }
          });
          /*
            if (e === "Deneme") {
              console.log("Değer bulundu");
            } else if (e === "ELEKTRIK") {
              console.log("Değer bulundu");
            } else {
              console.log("DEĞER BULUNAMADI");
            }
          });
          /*
          if (findText !== undefined) {
            // TO DO ELEKTRİK FATURASI ARRAYİNE KAYDETME İŞLEMİ//
            console.log("ELEKTRİK DEĞERİ BULUNDU", findText);
          } else {
            console.log("DEĞER BULUNAMADI");
          }*/
          /* array.map((e) => {
            if (e === {Random}) {
              console.log("value found: ", e);
            } else {
              console.log("error not found in array");
            }
          });*/
        };

        filteredArray(filteredResponse);
      }

      /*if (e === "Vision") {
          console.log("value found: ", e);
        } else {
          console.log("error not found in array");
        }
      };
*/
      /*
      if (test.description === "ELEKTRIK FATURASI") {
        console.log("elektrik faturası");
      } else {
        console.log("elktrk değil");
      }
      */
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////////////////////////////

  return (
    <>
      {isLoading ? (
        <LoadingIcon size="large" color="#0000FF" />
      ) : (
        <ProfileCamera
          ref={(camera) => (cameraRef.current = camera)}
          type={Camera.Constants.Type.back}
          ratio={"12:8"}
        >
          <TouchableOpacity onPress={snap}>
            <InnerSnap />
          </TouchableOpacity>
        </ProfileCamera>
      )}
    </>
  );
};
