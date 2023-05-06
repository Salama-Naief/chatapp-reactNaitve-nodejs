import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { styles } from "../../../utils/directionFun";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { iconsColor } from "../../../Constants/Constants";
import { axiosClient } from "../../../utils/connect";
import { useReduxSelector } from "../../../redux/store";

interface Props {
  title: string;
  name: string;
  setName: Function;
  NumberType?: boolean;
  onPress: Function;
  type: string;
  isLoading: boolean;
}
const ItemsData = ({
  title,
  name,
  setName,
  NumberType,
  onPress,
  type,
  isLoading,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const user = useReduxSelector((state) => state.user);

  const { t } = useTranslation();

  const handleSave = async () => {
    onPress(type);
    setEdit(false);
  };
  return (
    <View className="my-2 rounded p-2 bg-white">
      <Text className="text-gray-600 text-[16px]">{title}</Text>
      {edit ? (
        <View className="items-center" style={styles().rtl}>
          <TextInput
            keyboardType={NumberType ? "numeric" : "default"}
            value={name}
            textContentType={NumberType ? "telephoneNumber" : "name"}
            onChangeText={(text) => setName(text)}
            multiline={type === "description" ? true : false}
            className="bg-gray-100 flex-1 h-full rounded-lg text-[16px] px-4"
          />
          <TouchableOpacity
            onPress={() => handleSave()}
            disabled={isLoading}
            className="p-1 rounded-lg bg-main mx-2"
          >
            <Text className="text-[16px] text-white">
              {isLoading ? (
                <ActivityIndicator color="#00ff00" />
              ) : (
                t("settings:save")
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            onPress={() => setEdit(false)}
            className="  "
          >
            <AntDesign name="close" size={20} color={"red"} />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="justify-between" style={styles().rtl}>
          <Text
            className={`${
              type === "description"
                ? "text-gray-600"
                : "text-main text-xl capitalize"
            } `}
          >
            {name}
          </Text>
          <TouchableOpacity onPress={() => setEdit(true)}>
            <AntDesign name="edit" size={20} color={iconsColor} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ItemsData;
