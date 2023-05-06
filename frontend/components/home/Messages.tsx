import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { format, formatDistance } from "date-fns";

import { styles } from "../../utils/directionFun";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { profile } from "../../Constants/images";
import { useReduxSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { AddConv } from "../../redux/coversation";

interface Props {
  data: ConvProps;
  sellectedChat: { id: string; isGroup: boolean }[];
  setSellectedChat: Function;
}
const Messages = ({ data, sellectedChat, setSellectedChat }: Props) => {
  const user = useReduxSelector((state) => state.user);
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const friend = data.users?.find((u) => u._id !== user.user?._id);
  const imageUri = data.isGroup
    ? "https://res.cloudinary.com/dlttbpnxw/image/upload/v1682839000/chatapp/tmp-3-1682838992539_jzcyba.jpg"
    : friend?.avatar;
  const chatName = data.isGroup ? data.chatName : friend?.username;
  const lastMessage = data.latestMessage;
  console.log("lastMessage", lastMessage);

  const handleChat = () => {
    dispatch(
      AddConv({
        name: data.isGroup ? data.chatName : friend?.username,
        img: imageUri,
        groupMembers: data.isGroup ? data.users.length : undefined,
      })
    );
    navigation.navigate("chat", { id: data._id });
  };
  const isSellected = sellectedChat?.find((c) => c.id === data._id);
  console.log("isSellected", isSellected);
  console.log("sellectedChat", sellectedChat);
  console.log("setSellectedChat", setSellectedChat);
  return (
    <TouchableOpacity
      onLongPress={() =>
        setSellectedChat((prev: string[]) => [
          ...prev,
          { id: data._id, isGroup: data.isGroup },
        ])
      }
      onPress={() => handleChat()}
      className={`py-2 my-1 rounded relative ${isSellected && "bg-gray-200"}`}
      style={styles().rtl}
    >
      <View className="relative h-fit">
        <Image source={{ uri: imageUri }} className="h-14 w-14 rounded-full" />

        <View
          className={`absolute bottom-0 ${
            i18n.language === "ar" ? "left-0" : "right-0"
          } w-3.5 h-3.5 bg-main  border-white`}
          style={{ borderWidth: 2, borderRadius: 100 }}
        ></View>
      </View>
      <View
        className="flex-1 mx-4"
        style={
          i18n.language === "ar"
            ? { alignItems: "flex-end" }
            : { alignItems: "flex-start" }
        }
      >
        <Text className="text-[17px] text-gray-700 font-bold capitalize">
          {chatName}
        </Text>
        <Text numberOfLines={1} className="text-gray-500 ">
          {lastMessage?.content
            ? lastMessage?.content
            : lastMessage?.mediaType === "audio"
            ? "Reacord was sended to the chat"
            : lastMessage?.mediaType === "video"
            ? "Video was sended to the chat"
            : lastMessage?.mediaType === "image"
            ? "image was sended to the chat"
            : ""}
        </Text>
      </View>
      <View className="justify-center items-center">
        <Text className="text-gray-500 ">
          {lastMessage &&
            formatDistance(new Date(lastMessage.createdAt), Date.now())}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Messages;
