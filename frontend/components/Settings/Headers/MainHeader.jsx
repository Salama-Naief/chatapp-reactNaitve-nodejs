import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const MainHeader = ({ navgation }) => {
  return (
    <TouchableOpacity onPress={() => navgation.goBack()}>
      <Text className="text-main text-xl">More</Text>
    </TouchableOpacity>
  );
};

export default MainHeader;
