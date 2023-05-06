import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../utils/directionFun";
import { profile } from "../../Constants/images";
import { useNavigation } from "@react-navigation/native";

interface Props {
  onPress: Function;
  children: React.ReactElement;
}
const Btn = ({ onPress, children }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>{children}</TouchableOpacity>
  );
};
const CallingScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [mute, setMute] = useState<boolean>(false);

  const hnadleCallEnd = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-main">
      {/**header setion */}
      <View className="p-3 justify-center items-center bg-main rounded-b-xl translate-y-2 z-10">
        <View style={styles().rtl} className="items-center">
          <FontAwesome name="lock" size={20} color="white" />
          <Text className="text-[16px] text-white mx-2">
            {t("modal:end_to_end_encrypted")}
          </Text>
        </View>
        <Text className="text-3xl text-white font-semibold my-2">Username</Text>
        <Text className="text-lg text-white">{t("modal:calling")}</Text>
      </View>
      {/**second section */}
      <View className="bg-white flex-1 relative z-0">
        <Image
          source={profile}
          className="h-full w-full opacity-80"
          resizeMode="cover"
        />
        <View className="absolute left-0 bottom-8 w-full px-3">
          <View className=" text-center  items-center mb-4 ">
            <Btn onPress={() => hnadleCallEnd()}>
              <View className="justify-self-center bg-red-400 p-4 rounded-full">
                <MaterialIcons
                  name="call-end"
                  size={33}
                  color="white"
                  className="bg-red-400"
                />
              </View>
            </Btn>
          </View>
          <View className="justify-around p-4 rounded-xl bg-gray-500 flex-row">
            <Btn onPress={() => {}}>
              <Ionicons name="camera-reverse-outline" size={30} color="white" />
            </Btn>
            <Btn onPress={() => {}}>
              <Ionicons name="videocam-outline" size={30} color="white" />
            </Btn>
            {mute ? (
              <Btn onPress={() => setMute(!mute)}>
                <Ionicons name="mic-outline" size={30} color="white" />
              </Btn>
            ) : (
              <Btn onPress={() => setMute(!mute)}>
                <Ionicons name="mic-off-outline" size={30} color="white" />
              </Btn>
            )}
            <Btn onPress={() => {}}>
              <Ionicons name="menu" size={30} color="white" />
            </Btn>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CallingScreen;
