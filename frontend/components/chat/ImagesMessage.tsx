import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");
const ImagesMessage = ({ data }: { data?: string }) => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [sellectedImage, setSellectedImage] = React.useState<string>("");

  const handleImagePressed = (img: string) => {
    setSellectedImage(img);
    setModal(true);
  };
  return (
    <View className="">
      {data && (
        <TouchableOpacity onPress={() => handleImagePressed(data)}>
          <Image source={{ uri: data, height: 200 }} className="mb-2 rounded" />
        </TouchableOpacity>
      )}
      <Modal visible={modal}>
        <View className="relative" style={{ height, width }}>
          <TouchableOpacity
            onPress={() => setModal(false)}
            className="absolute bottom-10 left-1/2 z-10 bg-main p-1 rounded-full"
          >
            <AntDesign name="close" size={30} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: sellectedImage, height, width }} />
        </View>
      </Modal>
    </View>
  );
};

export default ImagesMessage;
