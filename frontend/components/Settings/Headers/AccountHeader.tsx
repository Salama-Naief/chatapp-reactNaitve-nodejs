import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { iconsColor } from "../../../Constants/Constants";

const AccountHeader = ({ navgation }: any) => {
  return (
    <TouchableOpacity onPress={() => navgation.goBack()}>
      <Entypo name="chevron-thin-left" size={24} color={iconsColor} />
    </TouchableOpacity>
  );
};

export default AccountHeader;
