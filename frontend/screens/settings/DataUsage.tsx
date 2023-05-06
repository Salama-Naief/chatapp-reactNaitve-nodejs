import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Item from "../../components/Settings/Item";
import SwitchItem from "../../components/Settings/SwitchItem";

const data = ["wifi_and_cellular", "wifi", "cellular"];
const DataUsage = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [lowDataUsage, setLowDataUsage] = useState<boolean>(true);
  return (
    <View className="flex-1 bg-white px-4">
      <ScrollView className="py-4" showsVerticalScrollIndicator={false}>
        <Text className="text-xl uppercase text-gray-600">
          {t("settings:media_auto_dwonload")}
        </Text>
        <Item
          title={t("settings:photos")}
          data={data}
          navigation={navigation}
        />
        <View className={`h-px bg-gray-300 mt-4`}></View>
        <Item title={t("settings:audio")} data={data} navigation={navigation} />
        <View className={`h-px bg-gray-300 mt-4`}></View>
        <Item
          title={t("settings:videos")}
          data={data}
          navigation={navigation}
        />
        <View className={`h-px bg-gray-300 mt-4`}></View>
        <Item
          title={t("settings:documents")}
          data={data}
          navigation={navigation}
        />
        <View className={`h-px bg-gray-300 mt-4`}></View>

        <TouchableOpacity className="py-6">
          <Text className="text-xl font-semibold  text-gray-600">
            {t("settings:rest_download_settings")}
          </Text>
        </TouchableOpacity>

        <View className={`h-px bg-gray-300 `}></View>
        <Text className="text-lg  text-gray-600 my-6">
          {t("settings:data_usage_desc")}
        </Text>
        <SwitchItem
          isEnabled={lowDataUsage}
          title={t("settings:low_data_usage")}
          toggleSwitch={setLowDataUsage}
        />
        <View className={`h-px bg-gray-300 mt-4`}></View>
        <Text className="text-lg  text-gray-600 mt-4">
          {t("settings:low_data_desc")}
        </Text>
        <Item
          title={t("settings:network_usage")}
          data={data}
          navigation={navigation}
        />
        <View className={`h-px bg-gray-300 mt-4`}></View>
        <Item
          title={t("settings:storage_usage")}
          data={data}
          navigation={navigation}
        />
        <View className={`h-px bg-gray-300 mt-4`}></View>
      </ScrollView>
    </View>
  );
};

export default DataUsage;
