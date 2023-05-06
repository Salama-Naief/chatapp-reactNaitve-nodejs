import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SellectUsers = ({
  unSellectUser,
  sellectedUsers,
}: {
  sellectedUsers: UserProps[];
  unSellectUser: Function;
}) => {
  const navigation = useNavigation();
  return (
    <View className="w-full max-h-32">
      <FlatList
        className="h-full"
        showsVerticalScrollIndicator={false}
        data={sellectedUsers}
        renderItem={({ item }) => (
          <View className=" flex-row items-center justify-between ">
            <View key={item._id} className="flex-row items-center gap-x-4 my-1">
              <Image
                source={{ uri: item.avatar }}
                className="rounded-full w-10 h-10"
              />
              <Text className="text-main capitalize text-lg">
                {item.username}
              </Text>
            </View>
            <TouchableOpacity onPress={() => unSellectUser(item)}>
              <AntDesign name="close" size={24} color={"red"} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SellectUsers;
