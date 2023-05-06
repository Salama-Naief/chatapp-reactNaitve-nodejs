import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import {
  Appereance,
  Chats,
  DataUsage,
  Help,
  InviteFriends,
  MainSettings,
  Notification,
  Privacy,
  UserInfo,
} from "../screens/settings";
import AccountRoute from "./settings/accountRoute";
import { CustomBackBtn, CustomTitle } from "../components/Settings/Headers";
import { icons } from "../Constants/Icons";
import { useTranslation } from "react-i18next";
import { useReduxSelector } from "../redux/store";

const Stack = createNativeStackNavigator();
const SettingsRoute = () => {
  const { t } = useTranslation();
  const user = useReduxSelector((state) => state.user);
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="settings"
        component={MainSettings}
        options={({ navigation }) => {
          return {
            title: "",
            headerLeft: () => <CustomBackBtn more={true} />,
          };
        }}
      />
      <Stack.Screen
        name="appereance"
        component={Appereance}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => <CustomBackBtn more={false} />,
            headerTitle: () => (
              <CustomTitle
                title={t("settings:appereance")}
                icon={icons.appereance}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="chats"
        component={Chats}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => <CustomBackBtn more={false} />,
            headerTitle: () => (
              <CustomTitle title={t("settings:chats")} icon={icons.chat} />
            ),
          };
        }}
      />
      <Stack.Screen
        name="data-usage"
        component={DataUsage}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => <CustomBackBtn more={false} />,
            headerTitle: () => (
              <CustomTitle
                title={t("settings:dataUsage")}
                icon={icons.dataUsage}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="invite-friends"
        component={InviteFriends}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => <CustomBackBtn more={false} />,
            headerTitle: () => (
              <CustomTitle
                title={t("settings:inviteFriends")}
                icon={icons.inviteFriends}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="notification"
        component={Notification}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => <CustomBackBtn more={false} />,
            headerTitle: () => (
              <CustomTitle
                title={t("settings:notification")}
                icon={icons.notification}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="account"
        component={AccountRoute}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="help"
        component={Help}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => <CustomBackBtn more={false} />,
            headerTitle: () => (
              <CustomTitle title={t("settings:help")} icon={icons.help} />
            ),
          };
        }}
      />
      <Stack.Screen
        name="privacy"
        component={Privacy}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            presentation: "modal",
            headerLeft: () => <CustomBackBtn more={false} />,
            headerTitle: () => (
              <CustomTitle title={t("settings:privacy")} icon={icons.privacy} />
            ),
          };
        }}
      />
      <Stack.Screen
        name="user-info"
        component={UserInfo}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => <CustomBackBtn more={false} />,
            headerTitle: () => (
              <CustomTitle title={user.user?.username ?? ""} />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsRoute;
