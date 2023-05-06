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
  data: string[];
  setModelState: Function;
  setSelectedItem: Function;
  title?: string;
}

const MenuModal = ({ data, title, setModelState, setSelectedItem }: Props) => {
  const { t } = useTranslation();
  const handleItemPress = (item: string) => {
    setSelectedItem(item);
    setModelState(false);
  };
  return (
    <View className="bg-transparent flex-1 relative">
      <View className="w-full h-full absolute top-0 left-0 bg-gray-700 opacity-40"></View>
      <Pressable
        onPress={() => setModelState(false)}
        className="w-full h-full"
      ></Pressable>
      <View className="absolute left-1/4 bottom-1/4 p-4 rounded-lg bg-gray-100 w-1/2">
        {title && (
          <Text className="text-gray-900 text-center text-3xl my-4">
            {t(`modal:${title}`)}
          </Text>
        )}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <Text className="text-3xl text-center text-main capitalize">
                {t(`modal:${item}`)}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ rowGap: 14 }}
        />
      </View>
    </View>
  );
};

export default MenuModal;
