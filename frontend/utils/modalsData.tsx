import { View, Text } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

const ModalsData = () => {
  const { t } = useTranslation();

  const chatsMenuData = [
    { label: "creatGroup", title: t("modal:creat_group") },
    { label: "createBroadcast", title: t("modal:create_broadcast") },
    { label: "starredMeassages", title: t("modal:starred_meassages") },
    { label: "archive", title: t("modal:archive") },
    { label: "settings", title: t("modal:settings") },
  ];

  const chatMenuData = [
    { label: "report", title: t("modal:report") },
    { label: "block", title: t("modal:block") },
    { label: "clearChat", title: t("modal:clear_chat") },
    { label: "archive", title: t("modal:archive") },
    { label: "addToGroup", title: t("modal:add_to_group") },
  ];

  const addConcatData = [
    { label: "addContact", title: t("modal:add_contact") },
  ];
  const createGroupData = [
    { label: "createGroup", title: t("modal:creat_group") },
  ];
  return {
    chatsMenuData,
    chatMenuData,
    addConcatData,
    createGroupData,
  };
};

export default ModalsData;
