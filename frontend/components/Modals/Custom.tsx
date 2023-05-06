import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  setModelState: Function;
  children: React.ReactElement;
  position: string;
  modalState: boolean;
  width: string;
  cancel?: boolean;
}
const CustomModal = ({
  setModelState,
  position,
  width,
  children,
  modalState,
  cancel,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Modal transparent={true} visible={modalState}>
      <View className="bg-transparent flex-1 relative">
        <View className="w-full h-full absolute top-0 left-0 bg-gray-700 opacity-40"></View>
        <Pressable
          onPress={() => setModelState(false)}
          className="w-full h-full relative"
        ></Pressable>
        <View className={`${position} ${width} absolute`}>
          <View className={` p-4 rounded-lg bg-gray-100`}>{children}</View>
          {cancel && (
            <TouchableOpacity
              onPress={() => setModelState(false)}
              className="text-main text-cnter text-2xl bg-gray-100 text-center my-2 p-2 rounded-xl"
            >
              <Text className="text-main text-2xl bg-gray-100 text-center">
                {t("modal:cancel")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
