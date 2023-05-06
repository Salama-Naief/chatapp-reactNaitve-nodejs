import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { iconsColor } from "../../../Constants/Constants";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const CustomBackBtn = ({ more, color }: { color?: string; more: boolean }) => {
  const { t } = useTranslation();
  const navgation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navgation.goBack()}>
      {more ? (
        <Text className="text-main text-xl">{t("main:more")}</Text>
      ) : (
        <Entypo
          name="chevron-thin-left"
          size={24}
          color={color ? color : iconsColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomBackBtn;
