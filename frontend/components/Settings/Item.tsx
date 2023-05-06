import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../utils/directionFun";
import { useTranslation } from "react-i18next";
import ArrowIcon from "../../utils/Arrow";
import CustomModal from "../Modals/CustomModal";
interface Props {
  title: string;
  navigation: any;
  modalTitle?: string;
  data: string[];
}

const Item = ({ title, modalTitle, data, navigation }: Props) => {
  const [itemModal, setItemModal] = useState<boolean>(false);
  const [itemSellected, setItemSelected] = useState<string>("");
  console.log("itemSellected", itemSellected);
  return (
    <>
      <TouchableOpacity
        onPress={() => setItemModal(true)}
        className=" my-6 justify-between items-center"
        style={styles().rtl}
      >
        <View className="flex-row gap-x-3">
          <Text className="text-[20px] text-gray-700 font-semibold">
            {title}
          </Text>
        </View>
        <ArrowIcon color="#94a3b8" />
      </TouchableOpacity>
      <Modal
        animationType="none"
        visible={itemModal}
        transparent={true}
        onDismiss={() => console.log("dismiss")}
      >
        <CustomModal
          data={data}
          setSelectedItem={setItemSelected}
          setModelState={setItemModal}
          title={modalTitle}
          position="left-1/4 bottom-1/4"
        />
      </Modal>
    </>
  );
};

export default Item;
