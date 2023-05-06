import { AntDesign, Ionicons } from "@expo/vector-icons";
import { iconsColor } from "./Constants";

export const icons = {
  user: <AntDesign name="user" size={33} color={iconsColor} />,

  chat: <Ionicons name="chatbubble-outline" size={31} color={iconsColor} />,

  appereance: (
    <Ionicons name="ios-sunny-outline" size={35} color={iconsColor} />
  ),

  notification: (
    <Ionicons name="notifications-outline" size={33} color={iconsColor} />
  ),

  privacy: <AntDesign name="Safety" size={34} color={iconsColor} />,

  dataUsage: <AntDesign name="folder1" size={28} color={iconsColor} />,

  help: <AntDesign name="infocirlceo" size={28} color={iconsColor} />,

  inviteFriends: <AntDesign name="mail" size={28} color={iconsColor} />,
};
