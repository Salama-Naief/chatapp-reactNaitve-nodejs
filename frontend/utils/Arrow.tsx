import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";

const ArrowIcon = ({ color }: { color: string }) => {
  const { i18n } = useTranslation();
  return (
    <>
      {i18n.language === "ar" ? (
        <Entypo name="chevron-thin-left" size={24} color={color} />
      ) : (
        <Entypo name="chevron-thin-right" size={24} color={color} />
      )}
    </>
  );
};

export default ArrowIcon;
