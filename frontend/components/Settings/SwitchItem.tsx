import { View, Text, Switch } from "react-native";
import React from "react";
import { styles } from "../../utils/directionFun";

interface Props {
  isEnabled: boolean;
  toggleSwitch: any;
  title: string;
}
const SwitchItem = ({ isEnabled, title, toggleSwitch }: Props) => {
  return (
    <View className=" justify-between items-center" style={styles().rtl}>
      <Text className="text-[20px] text-gray-700 font-semibold">{title}</Text>
      <Switch
        trackColor={{ false: "gray", true: "#57d382" }}
        thumbColor={isEnabled ? "#e2e8f0" : "#e2e8f0"}
        ios_backgroundColor="gray"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default SwitchItem;
