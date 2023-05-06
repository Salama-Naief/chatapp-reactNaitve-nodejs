import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export const styles = () => {
  const { i18n } = useTranslation();

  return StyleSheet.create({
    rtl: {
      flexDirection: i18n.language === "en" ? "row" : "row-reverse",
    },
    iconMargin:
      i18n.language === "en"
        ? { marginRight: 10 }
        : {
            marginLeft: 10,
          },
  });
};
