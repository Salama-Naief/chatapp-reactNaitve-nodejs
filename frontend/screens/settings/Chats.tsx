import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Item from "../../components/Settings/Item";
import SwitchItem from "../../components/Settings/SwitchItem";
import { useTranslation } from "react-i18next";
import CustomModal from "../../components/Modals/CustomModal";

interface TextItemProps {
  title: string;
  setOpenModal: Function;
  setSellectedPress: Function;
  color: string;
}
const TextItem = ({
  title,
  color,
  setOpenModal,
  setSellectedPress,
}: TextItemProps) => (
  <TouchableOpacity
    onPress={() => {
      setOpenModal(true);
      setSellectedPress(title);
    }}
  >
    <Text className={`${color} text-[20px] my-4`}>{title}</Text>
  </TouchableOpacity>
);
const Chats = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selletedItem, setSellectedItem] = useState<string>("");
  const [selletedPress, setSellectedPress] = useState<string>("");

  console.log("selletedItem", selletedItem);
  console.log("selletedPress", selletedPress);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View className="flex-1 px-4 py-4 bg-white">
      <View className={`h-px bg-gray-300 mt-4`}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Item
          data={["never", "always"]}
          title={t("settings:saveToCameraRoll")}
          navigation={navigation}
        />

        <SwitchItem
          title={t("settings:changeWallpaper")}
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
        />
        <Text className="text-gray-400 text-[16px]">
          {t("settings:chatDesc")}
        </Text>
        <View className={`h-px bg-gray-300 mt-4`}></View>
        <Item
          data={["never", "always"]}
          title={t("settings:chatBackup")}
          navigation={navigation}
        />
        <View className={`h-px bg-gray-300 `}></View>

        <TextItem
          title={t("settings:archiveAllChats")}
          setOpenModal={setOpenModal}
          setSellectedPress={setSellectedPress}
          color="text-sky-600"
        />
        <View className={`h-px bg-gray-300 `}></View>
        <TextItem
          title={t("settings:clearAllChats")}
          setOpenModal={setOpenModal}
          setSellectedPress={setSellectedPress}
          color="text-red-400"
        />
        <View className={`h-px bg-gray-300 `}></View>
        <TextItem
          title={t("settings:deleteAllChats")}
          setOpenModal={setOpenModal}
          setSellectedPress={setSellectedPress}
          color="text-red-400"
        />
      </ScrollView>
      <Modal
        animationType="none"
        transparent={true}
        visible={openModal}
        onDismiss={() => console.log("dis")}
      >
        <CustomModal
          data={["ok", "cancel"]}
          setModelState={setOpenModal}
          title="are_you_sure"
          setSelectedItem={setSellectedItem}
          position="left-1/4 bottom-1/4"
        />
      </Modal>
    </View>
  );
};

export default Chats;
