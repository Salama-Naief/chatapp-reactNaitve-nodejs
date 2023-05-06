import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { styles } from "../../utils/directionFun";

interface ItemButtonProps {
  title: string;
  numOfNofication: number;
}
const ItemButton = ({ title, numOfNofication }: ItemButtonProps) => {
  return (
    <TouchableOpacity
      style={styles().rtl}
      className="border border-gray-400 rounded px-4 py-1 relative mx-2"
    >
      <Text className="text-gray-500  mx-2">{title}</Text>
      {numOfNofication > 0 && (
        <Text className="text-white bg-main rounded-full px-2">
          {numOfNofication}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ItemButton;
