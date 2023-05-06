import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TextInputProps,
  DatePickerIOSBase,
  Button,
  Platform,
  Alert,
  Image,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { iconsColor } from "../../Constants/Constants";
import { Formik, FormikFormProps } from "formik";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { axiosClient } from "../../utils/connect";
import { useSelector, useDispatch } from "react-redux";
import { registerFromValidation } from "../../utils/yupValidation";
import { styles } from "../../utils/directionFun";
import { useReduxSelector } from "../../redux/store";
import { AddUser } from "../../redux/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

import choosePhoto from "../../utils/choosePhoto";
import { diff } from "../../utils/arrayDifferance";
import { AddConv } from "../../redux/coversation";

//sellected users
const UsersSellected = ({
  unSellectUser,
  sellectedUsers,
}: {
  sellectedUsers: UserProps[];
  unSellectUser: Function;
}) => (
  <View className="w-full max-h-32">
    <FlatList
      className="h-full"
      showsVerticalScrollIndicator={false}
      data={sellectedUsers}
      renderItem={({ item }) => (
        <View className=" flex-row items-center justify-between ">
          <View key={item._id} className="flex-row items-center gap-x-4 my-1">
            <Image
              source={{ uri: item.avatar }}
              className="rounded-full w-10 h-10"
            />
            <Text className="text-main capitalize text-lg">
              {item.username}
            </Text>
          </View>
          <TouchableOpacity onPress={() => unSellectUser(item)}>
            <AntDesign name="close" size={24} color={"red"} />
          </TouchableOpacity>
        </View>
      )}
    />
  </View>
);
//main function
const CreateGroup = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useReduxSelector((state) => state.user);
  const [chatName, setChatName] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [photo, setPhoto] = useState<{ uri: any; type: any }>({
    uri: "",
    type: "",
  });
  const [usersModal, setUsersModal] = useState<boolean>(false);

  const [searchUsers, setSearchUsers] = useState<UserProps[] | []>([]);
  const [sellectedUsers, setSeletecdUsers] = useState<UserProps[] | []>([]);

  useEffect(() => {
    setUsersModal(false);
    setSearchUsers([]);
    setSeletecdUsers([]);
    setSearch("");
    setErrorMsg("");
    setChatName("");
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

  const { handleChoosePhoto } = choosePhoto(
    ImagePicker.MediaTypeOptions.Images
  );
  console.log("user", user);
  React.useEffect(() => {
    if (user.user) {
      navigation.push("home");
    }
  }, []);

  const handelSubmit = async () => {
    try {
      setErrorMsg("");
      if (!chatName) {
        setErrorMsg("chat name is required");
        return;
      }
      if (sellectedUsers.length <= 0) {
        setErrorMsg("you must sellect some users");
        return;
      }
      const usersData = sellectedUsers.map((u) => u._id);
      const formData = new FormData();
      formData.append("chatName", chatName);
      formData.append("usersData", JSON.stringify(usersData));

      if (!photo?.uri) {
        setErrorMsg("you must sellect group image");
        return;
      }

      if (photo?.type === "image") {
        const type = photo.uri.split(".");
        formData.append("image", {
          name: new Date() + "_image",
          uri: photo.uri,
          type: `${photo.type}/${type[type.length - 1]}`,
        });
      } else {
        return Alert.alert("You can only upload image");
      }
      setIsLoading(true);
      const { data } = await axiosClient.post("/conversation/group", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.message) {
        setErrorMsg(data.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      console.log(data);
      dispatch(
        AddConv({
          img: data.image,
          name: data.chatName,
          groupMembers: data.users.length,
        })
      );
      navigation.navigate("chat", { id: data._id });
    } catch (error) {
      setIsLoading(false);
      setErrorMsg("somthing went wrong");
      console.log("error", error);
    }
  };

  const sellectUser = (user: UserProps) => {
    setSeletecdUsers((prev) => [...prev, user]);
  };

  const unSellectUser = (user: UserProps) => {
    const users = sellectedUsers.filter((u) => u._id !== user._id);
    setSeletecdUsers(users);
  };
  const handleChooseImage = async () => {
    const img = await handleChoosePhoto();
    setPhoto(img || { uri: "", type: "" });
  };
  return (
    <SafeAreaView className="flex-1 bg-white items-center  justify-center">
      <View className="px-4 items-center w-full">
        <View className="rounded-full w-24 h-24  justify-center items-center bg-gray-100 relative mb-4">
          {photo?.type === "image" ? (
            <Image
              source={{ uri: photo.uri }}
              className="w-full h-full rounded-full"
              resizeMode="center"
            />
          ) : (
            <AntDesign name="user" size={44} color={iconsColor} />
          )}
          <View className="absolute -bottom-1 -right-1 p-1 bg-main rounded-full">
            <TouchableOpacity onPress={() => handleChooseImage()}>
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {errorMsg && <Text className="text-red-400">{errorMsg}</Text>}
        <View className=" w-full  rounded-lg  items-center">
          <TextInput
            placeholder="ChatName(required)"
            value={chatName}
            onChangeText={(text) => setChatName(text)}
            className="px-4 py-2 bg-gray-100 w-full text-gray-600 rounded "
          />
          {sellectedUsers.length > 0 && (
            <UsersSellected
              sellectedUsers={sellectedUsers}
              unSellectUser={unSellectUser}
            />
          )}
          <TouchableOpacity
            onPress={() => setUsersModal(!usersModal)}
            className="px-4 py-2 w-full flex-row items-center justify-between rounded-full bg-gray-300 my-4"
          >
            <Text className="text-white font-bold text-[18px] text-center">
              Search for users
            </Text>
            <AntDesign name="search1" size={24} color={iconsColor} />
          </TouchableOpacity>
        </View>
        <Modal
          className="bg-gray-200"
          visible={usersModal}
          animationType="slide"
        >
          <View className="p-4 flex-1 my-4 w-full items-center rounded-lg">
            <TouchableOpacity
              onPress={() => {
                setSearchUsers([]);
                setSearch("");
                setUsersModal(false);
              }}
              className="ml-1"
            >
              <AntDesign name="closecircle" size={24} color={"gray"} />
            </TouchableOpacity>

            <TextInput
              placeholder="friend name"
              value={search}
              onChangeText={(text) => userSearch(text)}
              className="px-4 py-2 w-full bg-gray-100 text-gray-600 rounded "
            />
            {sellectedUsers.length > 0 && (
              <UsersSellected
                sellectedUsers={sellectedUsers}
                unSellectUser={unSellectUser}
              />
            )}
            {searchUsers.length > 0 && (
              <FlatList
                className=" w-full h-48  flex-1 bg-gray-100 mt-4 p-4 rounded-lg"
                data={diff(searchUsers, sellectedUsers)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => sellectUser(item)}
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
        </Modal>
      </View>
      <TouchableOpacity
        onPress={() => handelSubmit()}
        disabled={isLoading}
        className="px-4 py-3 z-0 rounded-full bg-main my-4"
      >
        <Text className="text-white font-bold text-[18px] text-center">
          {isLoading ? "loading..." : "Create"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateGroup;
