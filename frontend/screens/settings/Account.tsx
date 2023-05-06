import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { accountData } from "../../utils/MainSettingsData";
import Item from "../../components/Settings/Item";
import { useTranslation } from "react-i18next";

const Account = ({ navigation }: any) => {
  const { t } = useTranslation();
  return (
    <View className="p-4 flex-1 bg-white">
      <View className={`h-px bg-gray-300 mt-4`}></View>
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View className={`h-px bg-gray-300`}></View>
        )}
        data={accountData(t)}
        renderItem={({ item }) => (
          <Item title={item.title} link={item.link} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default Account;
