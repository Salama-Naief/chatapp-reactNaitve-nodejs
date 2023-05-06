import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Feather } from "@expo/vector-icons";
import { styles } from "../../utils/directionFun";
import { profile } from "../../Constants/images";
import { useNavigation } from "@react-navigation/native";

interface CallItemProps {
  name: string;
  createdAt: string;
  actionType: string;
  calling: boolean;
}
const CallItem = ({ data }: { data: CallItemProps }) => {
  const { i18n } = useTranslation();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("calling")}
      className="my-2 justify-between"
      style={styles().rtl}
    >
      <View style={styles().rtl}>
        <View className="relative">
          <Image source={profile} className="h-14 w-14 rounded-full" />
          <View
            className={`absolute bottom-0 ${
              i18n.language === "ar" ? "left-0" : "right-0"
            } w-3 h-3 bg-main  border-white`}
            style={{ borderWidth: 1.5, borderRadius: 100 }}
          ></View>
        </View>
        <View className=" items-center justify-center mx-4">
          <Text className="text-[17px] text-gray-700 capitalize font-bold">
            {data?.name}
          </Text>
          <Text numberOfLines={2} className="text-gray-500 ">
            {data?.createdAt}
          </Text>
        </View>
      </View>

      <View className="justify-center items-center">
        <View className="items-center justify-center" style={styles().rtl}>
          {data.calling ? (
            <Feather
              name="arrow-up-right"
              size={24}
              color="#57d382"
              style={{ marginHorizontal: 10 }}
            />
          ) : (
            <Feather
              name="arrow-down-left"
              size={24}
              color="red"
              style={{ marginHorizontal: 10 }}
            />
          )}
          <View>
            {data.actionType === "calling" ? (
              <Feather name="phone-call" size={24} color="gray" />
            ) : data.actionType === "video" ? (
              <Feather name="video" size={24} color="gray" />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CallItem;
