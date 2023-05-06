import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SettingsRoute from "./SettingsRoute";
import ChatRoute from "./ChatRoute";
import HomeRoute from "./HomeRoute";
import CallRoute from "./CallRoute";
import { useTranslation } from "react-i18next";
import MainHeader from "../components/headers/MainHeader";
import ModalsData from "../utils/modalsData";

const Tab = createBottomTabNavigator();

const IconSize = 26;
const MainRoute = () => {
  const { t } = useTranslation();
  const { addConcatData, chatsMenuData, createGroupData } = ModalsData();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#57d382",
        tabBarStyle: {
          borderRadius: 20,
          marginBottom: 0,
          shadowColor: "",
          height: 70,
          direction: "rtl",
          position: "relative",
          bottom: 0,
          paddingHorizontal: 10,
          paddingVertical: 10,
          shadowRadius: 12,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        headerBackgroundContainerStyle: {
          backgroundColor: "#57d382",
        },
        tabBarLabelStyle: {
          fontSize: 16,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoute}
        options={{
          title: t("main:home") ?? "Home",
          headerShadowVisible: false,
          header: () => (
            <MainHeader screen="home" menuData={createGroupData} plus={false} />
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={IconSize} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatRoute}
        options={{
          title: t("main:chat") ?? "Chat",
          headerShadowVisible: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={IconSize} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Call"
        component={CallRoute}
        options={{
          title: t("main:call") ?? "Call",
          headerShadowVisible: false,
          header: () => (
            <MainHeader
              screen="call"
              menuData={[{ title: "", label: "" }]}
              plus={false}
            />
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="call-outline" size={IconSize} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsRoute}
        options={{
          title: t("main:settings") ?? "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={IconSize} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainRoute;
