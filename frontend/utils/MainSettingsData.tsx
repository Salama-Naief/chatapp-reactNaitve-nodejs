import { icons } from "../Constants/Icons";

export const SettingsData = (t: any): SettingsDataProps[] => {
  return [
    {
      id: 1,
      title: t("settings:account"),
      link: "account",
      icon: icons.user,
    },
    {
      id: 2,
      title: t("settings:chats"),
      link: "chats",
      icon: icons.chat,
    },
    {
      id: 3,
      title: t("settings:appereance"),
      link: "appereance",
      icon: icons.appereance,
    },
    {
      id: 4,
      title: t("settings:notification"),
      link: "notification",
      icon: icons.notification,
    },
    {
      id: 5,
      title: t("settings:privacy"),
      link: "privacy",
      icon: icons.privacy,
    },
    {
      id: 6,
      title: t("settings:dataUsage"),
      link: "data-usage",
      icon: icons.dataUsage,
    },
    {
      id: 7,
      title: t("settings:help"),
      link: "help",
      icon: icons.help,
    },
    {
      id: 8,
      title: t("settings:inviteFriends"),
      link: "invite-friends",
      icon: icons.inviteFriends,
    },
  ];
};

export const accountData = (t: any): SettingsDataProps[] => {
  return [
    {
      id: 1,
      title: t("settings:privacy"),
      link: "privacy",
    },
    {
      id: 2,
      title: t("settings:security"),
      link: "security",
    },
    {
      id: 3,
      title: t("settings:twoStepVerification"),
      link: "two-Step-verification",
    },
    {
      id: 4,
      title: t("settings:changeNumber"),
      link: "change-number",
    },
    {
      id: 5,
      title: t("settings:changeEmail"),
      link: "change-email",
    },
  ];
};
