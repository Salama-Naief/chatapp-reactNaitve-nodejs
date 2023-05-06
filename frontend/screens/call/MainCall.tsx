import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import { styles } from "../../utils/directionFun";
import { useTranslation } from "react-i18next";

import { profile } from "../../Constants/images";
import { FlatList } from "react-native";
import { calls } from "../../utils/users";
import CallItem from "../../components/call/CallItem";

const MainCall = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-gray-500">No call found</Text>
          </View>
        }
        ListHeaderComponent={
          <Text className="text-gray-700 text-2xl font-bold">Recent Calls</Text>
        }
        data={calls}
        renderItem={({ item }) => <CallItem data={item} />}
        contentContainerStyle={{ rowGap: 8 }}
      />
    </View>
  );
};

export default MainCall;
