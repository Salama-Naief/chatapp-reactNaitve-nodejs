import { View, Text } from "react-native";
import React from "react";

interface Props {
  title: string;
  icon?: React.ReactElement;
}
const CustomTitle = ({ title, icon }: Props) => {
  return (
    <View className="flex-row items-center justify-center gap-x-2  w-[90%] ">
      {icon}
      <Text className="text-2xl capitalize">{title}</Text>
    </View>
  );
};

export default CustomTitle;
