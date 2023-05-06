import { View, Text, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import React, { useState, useEffect } from "react";
import { Ionicons, FontAwesome, EvilIcons } from "@expo/vector-icons";
import CustomModal from "../Modals/Custom";
import { useTranslation } from "react-i18next";
import { styles } from "../../utils/directionFun";
import CameraModal from "../Modals/CameraModal";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import choosePhoto from "../../utils/choosePhoto";

interface Props {
  modal: boolean;
  setModal: Function;
  setMedia: Function;
  convId: number;
}

const iconsColor = "#47A98C";
const OptionsFilesModal = ({ modal, setModal, setMedia, convId }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { handleChoosePhoto } = choosePhoto(ImagePicker.MediaTypeOptions.All);

  const handlePress = async (type: string) => {
    setModal(false);
    if (type === "camera") {
      // setCameraOpen(true);
      navigation.navigate("camera", { id: convId });
    } else if (type === "media") {
      const img = await handleChoosePhoto();
      console.log("img", img);
      setMedia(img);
      //navigation.navigate("media", { id: convId });
    } else if (type === "location") {
      navigation.navigate("location", { id: convId });
    } else if (type === "settings") {
      navigation.navigate("settings");
    } else if (type === "document") {
      navigation.navigate("document", { id: convId });
    }
  };
  return (
    <CustomModal
      modalState={modal}
      setModelState={setModal}
      width="w-11/12"
      position="bottom-5 left-5"
      cancel={true}
    >
      <>
        <TouchableOpacity
          onPress={() => handlePress("camera")}
          style={styles().rtl}
          className="items-center"
        >
          <Ionicons name="ios-camera-outline" size={30} color={iconsColor} />
          <Text className="text-gray-700 text-2xl  mx-3 font-semibold">
            {t("modal:camera")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress("media")}
          style={styles().rtl}
          className="items-center my-4"
        >
          <FontAwesome name="file-photo-o" size={24} color={iconsColor} />
          <Text className="text-gray-700 text-2xl  mx-3 font-semibold">
            {t("modal:photo_video_lib")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress("document")}
          style={styles().rtl}
          className="items-center my-3"
        >
          <Ionicons name="document-outline" size={30} color={iconsColor} />
          <Text className="text-gray-700 text-2xl  mx-3 font-semibold">
            {t("modal:document")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress("location")}
          style={styles().rtl}
          className="items-center my-3"
        >
          <Ionicons name="location-outline" size={30} color={iconsColor} />
          <Text className="text-gray-700 text-2xl  mx-3 font-semibold">
            {t("modal:location")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress("settings")}
          style={styles().rtl}
          className="items-center my-3"
        >
          <EvilIcons name="user" size={33} color={iconsColor} />
          <Text className="text-gray-700 text-2xl  mx-3 font-semibold">
            {t("modal:contcat")}
          </Text>
        </TouchableOpacity>
      </>
    </CustomModal>
  );
};

export default OptionsFilesModal;
