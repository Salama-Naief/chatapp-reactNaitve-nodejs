import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Image,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useTransition } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import CustomModal from "../Modals/CustomModal";
import Custom from "../Modals/Custom";

import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { axiosClient } from "../../utils/connect";
import { profile } from "../../Constants/images";
import { useReduxSelector } from "../../redux/store";
import { useNavigation } from "@react-navigation/native";

interface Props {
  plus?: boolean;
  menuData?: { label: string; title: string }[];
  plusData?: string[];
  screen: string;
}

const MainHeader = ({ plus, screen, menuData, plusData }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const user = useReduxSelector((state) => state.user);
  const [search, setSearch] = useState<string>("");
  const [searchIcon, setSearchIcon] = useState<boolean>(false);
  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [searchUsers, setSearchUsers] = useState<UserProps[] | []>([]);

  useEffect(() => {
    setModal(false);
    setSearchUsers([]);
    setSearch("");
  }, []);

  const userSearch = async (text: string) => {
    setSearch(text);
    try {
      const { data } = await axiosClient.get(`/users?search=${text}`);
      if (data) {
        const users = data.users.filter(
          (u: UserProps) => u._id !== user.user?._id
        );
        setSearchUsers(users || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchClose = () => {
    setSearchIcon(false);
    setSearchUsers([]);
    setSearch("");
  };

  const createConvarsation = async (userId: string) => {
    try {
      const userData = { userId };
      const { data } = await axiosClient.post("conversation", userData);
      console.log("data create conv", data);
      if (data.message) {
        Alert.alert(data.message);
      }
      navigation.navigate("chat", { id: data._id });
      handleSearchClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handelMenuTaps = async (type: string) => {
    if (type === "creatGroup") {
      navigation.navigate("createGroup");
    }
    setModal(false);
  };
  console.log("searchUsers", searchUsers);
  return (
    <SafeAreaView>
      <View className=" flex-row py-4 px-4 bg-secondary items-center justify-between rounded-bl-xl rounded-br-xl">
        <Text className="text-white text-4xl font-bold">Void</Text>
        <View className="flex-row items-center gap-x-3 flex-1 justify-end">
          {searchIcon ? (
            <View className="flex-row flex-1 pl-4 items-center">
              <TextInput
                placeholder="friend name"
                value={search}
                onChangeText={(text) => userSearch(text)}
                className="px-4 py-1 bg-gray-100 w-32 flex-1 text-gray-600 rounded "
              />
              <TouchableOpacity
                onPress={() => handleSearchClose()}
                className="ml-1"
              >
                <AntDesign name="close" size={24} color={"white"} />
              </TouchableOpacity>
              {searchUsers.length > 0 && (
                <FlatList
                  className="absolute top-10 left-0 w-full  flex-1 bg-gray-100 p-4 rounded-lg"
                  data={searchUsers || []}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item._id}
                      onPress={() => createConvarsation(item._id)}
                      className="flex-row items-center gap-x-4 my-1"
                    >
                      <Image
                        source={{ uri: item.avatar }}
                        className="rounded-full w-12 h-12"
                      />
                      <Text className="text-main capitalize text-lg">
                        {item.username}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          ) : (
            <TouchableOpacity onPress={() => setSearchIcon(true)}>
              <AntDesign name="search1" size={24} color={"white"} />
            </TouchableOpacity>
          )}
          {plus && (
            <TouchableOpacity onPress={() => setPlusIcon(true)}>
              <Entypo name="plus" size={26} color={"white"} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setModal(true)}>
            <Entypo name="menu" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <Custom
          modalState={modal}
          setModelState={setModal}
          position="top-8 right-6"
          width="w-fit"
        >
          <>
            {menuData?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handelMenuTaps(item.label)}
                className="my-2"
              >
                <Text className="text-main text-lg">{item.title}</Text>
              </TouchableOpacity>
            ))}
          </>
        </Custom>
        {/* <Modal
          transparent={true}
          visible={plusIcon || menuIcon}
          animationType="fade"
        >
          <CustomModal
            data={plusIcon ? plusData : menuData}
            modalType={plusIcon ? "add" : "menu"}
            position={plusIcon ? "top-5 right-10" : "top-5 right-5"}
            setModelState={plusIcon ? setPlusIcon : setMenuIcon}
            setSelectedItem={setSelectedItem}
          />
          </Modal>*/}
      </View>
    </SafeAreaView>
  );
};

export default MainHeader;
