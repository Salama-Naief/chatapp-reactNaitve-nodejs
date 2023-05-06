import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { SettingsData } from "../../utils/MainSettingsData";
import { useTranslation } from "react-i18next";
import { styles } from "../../utils/directionFun";
import ArrowIcon from "../../utils/Arrow";

//single Item
const Item = ({ item, navigation }: { item: any; navigation: any }) => {
  const { i18n } = useTranslation();
  return (
    <>
      <View
        className={`${
          item.title === "Help" || item.title === "المساعدة"
            ? "h-px my-6"
            : "h-0"
        } bg-gray-300`}
      ></View>
      <TouchableOpacity
        onPress={() => navigation.push(item.link)}
        className={` my-4 justify-between items-center `}
        style={styles().rtl}
      >
        <View className={``} style={styles().rtl}>
          <View style={styles().iconMargin}>{item.icon}</View>
          <Text className="text-[20px] text-gray-700 font-semibold">
            {item.title}
          </Text>
        </View>
        <ArrowIcon color="#374151" />
      </TouchableOpacity>
    </>
  );
};

const MainSettings = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();

  return (
    <View className="px-4 flex-1" style={{ backgroundColor: "white" }}>
      <FlatList
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => navigation.push("user-info")}
            className={` justify-between my-4 items-center`}
            style={styles().rtl}
          >
            <View style={styles().rtl}>
              <View
                className="p-3 rounded-full bg-gray-200"
                style={styles().iconMargin}
              >
                <AntDesign name="user" size={33} color="#374151" />
              </View>
              <View>
                <Text className="text-[20px] text-gray-700 font-semibold">
                  Salama Naief
                </Text>
                <Text className="text-lg text-gray-400 font-semibold">
                  01063723668
                </Text>
              </View>
            </View>

            <ArrowIcon color="#374151" />
          </TouchableOpacity>
        }
        showsVerticalScrollIndicator={false}
        data={SettingsData(t)}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
      />
    </View>
  );
};

export default MainSettings;
