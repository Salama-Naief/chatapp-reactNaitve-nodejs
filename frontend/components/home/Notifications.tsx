import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import { styles } from "../../utils/directionFun";
import { useTranslation } from "react-i18next";
import { Feather } from "@expo/vector-icons";
import { profile } from "../../Constants/images";

interface Props {
  id: number;
  name: string;
  message: string;
  createAt: string;
  action: string;
  goupName?: string;
  groupMembers?: number;
  actionType?: string;
  notificationType: string;
}
const Notifications = ({ data }: { data: Props }) => {
  const { i18n } = useTranslation();
  return (
    <TouchableOpacity className="my-2 justify-between" style={styles().rtl}>
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
            {data?.createAt}
          </Text>
        </View>
      </View>
      {data.notificationType === "group" && (
        <View className="items-center flex-1 mx-2" style={styles().rtl}>
          <Text
            className={`${
              data.action === "add" ? "text-secondary" : "text-red-400"
            } mx-3 flex-1`}
          >
            {data.action === "add" ? "Add you to" : "Remove you from"}
          </Text>
          <Image source={profile} className="h-9 w-9 rounded-full" />
        </View>
      )}
      <View className="justify-center items-center">
        {data.notificationType === "group" ? (
          <>
            <Text className="font-bold  capitalize">{data.goupName}</Text>
            <Text className=" text-gray-400">{data.groupMembers} Members</Text>
          </>
        ) : data.notificationType === "call" ? (
          <View className="items-center justify-center" style={styles().rtl}>
            <Feather
              name="arrow-down-left"
              size={24}
              color="red"
              style={{ marginHorizontal: 10 }}
            />
            <View>
              {data.actionType === "calling" ? (
                <Feather name="phone-call" size={24} color="gray" />
              ) : (
                <Feather name="video" size={24} color="gray" />
              )}
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Notifications;
