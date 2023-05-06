import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Privacy,
  ChangeEmail,
  ChangeNumber,
  Security,
  TwoStepVerification,
  Account,
} from "../../screens/settings";
import { CustomBackBtn, CustomTitle } from "../../components/Settings/Headers";

import { icons } from "../../Constants/Icons";
import { useTranslation } from "react-i18next";
const Stack = createNativeStackNavigator();
const AccountRoute = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="account"
        component={Account}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => (
              <CustomBackBtn more={false} navgation={navigation} />
            ),
            headerTitle: () => (
              <CustomTitle title={t("settings:account")} icon={icons.user} />
            ),
          };
        }}
      />
      <Stack.Screen
        name="change-number"
        component={ChangeNumber}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => (
              <CustomBackBtn more={false} navgation={navigation} />
            ),
            headerTitle: () => (
              <CustomTitle title={t("settings:changeNumber")} />
            ),
          };
        }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => (
              <CustomBackBtn more={false} navgation={navigation} />
            ),
            headerTitle: () => (
              <CustomTitle title={t("settings:changeEmail")} />
            ),
          };
        }}
      />
      <Stack.Screen
        name="two-step-verification"
        component={TwoStepVerification}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => (
              <CustomBackBtn more={false} navgation={navigation} />
            ),
            headerTitle: () => <CustomTitle title="Two step verification" />,
          };
        }}
      />

      <Stack.Screen
        name="privacy"
        component={Privacy}
        options={({ navigation }) => {
          return {
            headerBackVisible: false,
            headerLeft: () => (
              <CustomBackBtn more={false} navgation={navigation} />
            ),
            headerTitle: () => (
              <CustomTitle title="Privacy" icon={icons.privacy} />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountRoute;
