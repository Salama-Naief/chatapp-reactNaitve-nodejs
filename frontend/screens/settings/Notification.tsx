import { View, Text, Switch, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Item from "../../components/Settings/Item";
import SwitchItem from "../../components/Settings/SwitchItem";
import SoundItem from "../../components/Settings/SoundItem";
import { useTranslation } from "react-i18next";

const NotificationItem = ({ title, header, isEnabled, toggleSwitch }: any) => {
  const { t } = useTranslation();
  return (
    <View className="mt-8">
      <Text className="text-[17px] text-gray-400 ">{header}</Text>
      <SwitchItem
        title={title}
        isEnabled={isEnabled}
        toggleSwitch={toggleSwitch}
      />
      <View className={`h-px bg-gray-300 my-1`}></View>
      <SoundItem title={t("settings:sound")} />
    </View>
  );
};

const Notification = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [messageNoti, setMessageNoti] = useState(true);
  const [groupNoti, setGroupNoti] = useState(true);
  const [chatNoti, setChatNoti] = useState(true);

  return (
    <View className="flex-1 px-4 py-4 bg-white">
      <View className={`h-px bg-gray-300 mt-4`}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NotificationItem
          title={t("settings:show_notification")}
          isEnabled={messageNoti}
          toggleSwitch={() => setMessageNoti(!messageNoti)}
          header={t("settings:message_notifiction")}
        />

        <NotificationItem
          header={t("settings:group_notifiction")}
          isEnabled={groupNoti}
          toggleSwitch={() => setGroupNoti(!groupNoti)}
          title={t("settings:show_notification")}
        />
        <NotificationItem
          header={t("settings:message_notifiction")}
          isEnabled={chatNoti}
          toggleSwitch={() => setChatNoti(!chatNoti)}
          title={t("settings:chat_notifiction")}
        />
      </ScrollView>
    </View>
  );
};

export default Notification;
