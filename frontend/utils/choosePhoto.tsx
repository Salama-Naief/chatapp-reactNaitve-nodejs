import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
const choosePhoto = (type: ImagePicker.MediaTypeOptions) => {
  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: type,
          aspect: [4, 3],
          quality: 1,
        });

      console.log("response", response);
      if (!response.canceled) {
        return {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
        };
      }
    }
  };
  return {
    handleChoosePhoto,
  };
};

export default choosePhoto;
