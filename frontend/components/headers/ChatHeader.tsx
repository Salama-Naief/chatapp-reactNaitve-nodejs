import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import CustomModal from "../Modals/Custom";
import ModalsData from "../../utils/modalsData";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import socketIOClient from "socket.io-client";
import { useReduxSelector } from "../../redux/store";

import { ENDPOINT } from "../../Constants/EndPoint";

const ChatHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const user = useReduxSelector((state) => state.user);
  const conv = useReduxSelector((state) => state.conversation);
  const { chatMenuData } = ModalsData();
  const [menuIcon, setMenuIcon] = useState<boolean>(false);
  const [sellectedMenu, setSelectedMenu] = useState<string>("");

  console.log("conv Header", conv);

  React.useEffect(() => {}, []);
  const handleSellect = (title: string) => {
    setSelectedMenu(title);
    setMenuIcon(false);
    console.log("sellectedMenu", sellectedMenu);
  };

  const handelBack = () => {
    navigation.navigate("Chats");
    const socket = socketIOClient(ENDPOINT);
    socket.emit("unsubscribe", route.params?.id);
  };

  return (
    <SafeAreaView>
      <View className="flex-row py-3  px-2 bg-secondary items-center justify-between rounded-bl-xl rounded-br-xl">
        <View className="flex-row items-center gap-x-2">
          <TouchableOpacity onPress={() => handelBack()}>
            <Feather name="chevron-left" size={34} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: conv.img }}
            className="h-11 w-11 rounded-full"
          />
          <View>
            <Text className="text-white text-[17px] font-bold">
              {conv?.name}
            </Text>
            {conv.groupMembers && (
              <Text className="text-white text-[15px] ">
                {conv.groupMembers} members
              </Text>
            )}
          </View>
        </View>
        <View className="flex-row items-center gap-x-4 flex-1 justify-end">
          <TouchableOpacity onPress={() => {}}>
            <Feather name="phone-call" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="video" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuIcon(true)}>
            <Entypo name="menu" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <CustomModal
          modalState={menuIcon}
          setModelState={setMenuIcon}
          position="top-3 right-6"
          width="w-1/2"
        >
          <>
            {chatMenuData.map((item) => (
              <TouchableOpacity
                key={item.title}
                onPress={() => handleSellect(item.label)}
              >
                <Text className="text-xl my-1 text-main">{item.title}</Text>
              </TouchableOpacity>
            ))}
          </>
        </CustomModal>
      </View>
    </SafeAreaView>
  );
};

export default ChatHeader;
