import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { profile } from "../../Constants/images";

interface Props {
  name: string;
}
const Story = ({ name }: Props) => {
  return (
    <TouchableOpacity className="py-2 items-center justify-center">
      <View
        className="border-secondary "
        style={{ borderWidth: 2, borderRadius: 100 }}
      >
        <View
          className="border-white "
          style={{ borderWidth: 2, borderRadius: 100 }}
        >
          <Image source={profile} className="w-12 h-12 rounded-full" />
        </View>
      </View>
      <Text className="text-gray-400 capitalize">{name}</Text>
    </TouchableOpacity>
  );
};

export default Story;
