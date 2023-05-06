import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../utils/directionFun";
import ArrowIcon from "../../utils/Arrow";
import CustomModal from "../Modals/CustomModal";
interface Props {
  title: string;
}

const data = ["beep", "deed"];
const SoundItem = ({ title }: Props) => {
  const [soundModal, setSoundModal] = useState<boolean>(false);
  const [sellectedSound, setSellectedSound] = useState<string>("beep");
  console.log("sellectedSound", sellectedSound);
  return (
    <View className=" my-4 justify-between items-center" style={styles().rtl}>
      <View className=" gap-x-3">
        <Text className="text-[20px] text-gray-700 font-semibold">{title}</Text>
      </View>
      <TouchableOpacity
        className=" justify-between items-center"
        style={styles().rtl}
        onPress={() => setSoundModal(true)}
      >
        <Text className="text-gray-400 text-[18px] capitalize">
          {sellectedSound}
        </Text>
        <ArrowIcon color="#94a3b8" />
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={soundModal}
        onDismiss={() => setSoundModal(false)}
      >
        <CustomModal
          data={data}
          setModelState={setSoundModal}
          setSelectedItem={setSellectedSound}
          position="left-1/4 bottom-1/4"
        />
      </Modal>
    </View>
  );
};

export default SoundItem;
