import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { iconsColor } from "../../Constants/Constants";
import { styles } from "../../utils/directionFun";
import { useTranslation } from "react-i18next";
import { icons } from "../../Constants/Icons";
import ItemsData from "../../components/Settings/user/ItemsData";
import { useReduxSelector } from "../../redux/store";
import { axiosClient } from "../../utils/connect";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddUser } from "../../redux/user";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

interface ButtonItemsProps {
  title: string;
  icon: React.ReactElement;
}
const ButtonItems = ({ title, icon }: ButtonItemsProps) => {
  return (
    <TouchableOpacity className="bg-white rounded-xl min-w-fit py-2  px-4 items-center  justify-center">
      {icon}
      <Text className="capitalize text-[16px]  text-gray-700 mt-2">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const UserInfo = ({ navigation }: any) => {
  const { t } = useTranslation();

  const user = useReduxSelector((state) => state.user);
  const [username, setUsername] = useState<string>(user.user?.username || "");
  const [phone, setPhone] = useState<string>(user.user?.phone || "");
  const [website, setWebsite] = useState<string>(user.user?.website || "");
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState<string>(
    user.user?.description || ""
  );
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log("user login", user);
  React.useEffect(() => {
    if (!user.user) {
      navigation.push("login");
    }
  }, []);

  const handleUdate = async (type: string) => {
    try {
      if (user.user && type) {
        const formData = new FormData();
        if (type === "username") {
          formData.append("username", username);
        } else if (type === "phone") {
          formData.append("phone", phone);
        } else if (type === "website") {
          formData.append("website", website);
        } else if (type === "description") {
          formData.append("description", description);
        }
        if (cover && type === "photo") {
          const type = cover.split(".");
          formData.append("cover", {
            name: new Date() + "_cover",
            uri: cover,
            type: `image/${type[type.length - 1]}`,
          });
        }
        if (avatar && type === "photo") {
          const type = avatar.split(".");
          formData.append("avatar", {
            name: new Date() + "_avatar",
            uri: avatar,
            type: `image/${type[type.length - 1]}`,
          });
        }
        setErrorMsg("");
        setIsLoading(true);
        const { data } = await axiosClient.patch(
          `/users/${user.user?._id}`,
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data.message) {
          setErrorMsg(data.message);
          setIsLoading(false);
          return;
        }
        dispatch(AddUser(data));
        console.log("uodate", data);
        await AsyncStorage.setItem("@user", JSON.stringify(data));
        setIsLoading(false);
        setAvatar("");
        setCover("");
      } else {
        setErrorMsg("Unauthintecated");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleChoosePhoto = async (type: string) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

      console.log("response", response);
      if (!response.canceled) {
        if (type === "avatar") {
          setAvatar(response.assets[0].uri);
        } else if (type === "cover") {
          setCover(response.assets[0].uri);
        }
      }
    }
  };

  return (
    <View className="flex-1 bg-gray-100 w-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-fit relative mb-4">
          <View className="h-36 w-full relative">
            <Image
              source={{ uri: cover ? cover : user.user?.cover }}
              className="h-full w-full"
            />
          </View>

          <View className="absolute   overflow-hidden flex-row justify-center w-full left-0 -bottom-5">
            <View className="h-20 w-20 bg-main rounded-full relative">
              <Image
                source={{ uri: avatar ? avatar : user.user?.avatar }}
                className="h-full w-full rounded-full"
              />
              <View className="absolute top-0 left-0 w-full h-full rounded-full items-center justify-center">
                <TouchableOpacity
                  onPress={() => handleChoosePhoto("avatar")}
                  className="bg-main p-1 rounded-full"
                >
                  <AntDesign name="camerao" size={24} color={"white"} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="absolute z-50 top-2 right-2 bg-main p-2 rounded-full">
              <TouchableOpacity onPress={() => handleChoosePhoto("cover")}>
                <AntDesign name="camerao" size={24} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {(avatar || cover) && (
          <TouchableOpacity
            onPress={() => handleUdate("photo")}
            disabled={isLoading}
            className=" px-4"
          >
            <Text className=" text-center text-white bg-main rounded py-2 my-4 capitalize ">
              {isLoading ? (
                <ActivityIndicator color="#00ff00" />
              ) : (
                "update Image"
              )}
            </Text>
          </TouchableOpacity>
        )}
        <View className="flex-1 bg-gray-100 mt-4">
          <View className="justify-around px-2 flex-wrap" style={styles().rtl}>
            <ButtonItems
              title={t("main:chat")}
              icon={<AntDesign name="message1" size={24} color={iconsColor} />}
            />
            <ButtonItems
              title={t("main:call")}
              icon={
                <Ionicons name="call-outline" size={24} color={iconsColor} />
              }
            />
            <ButtonItems
              title={t("settings:mail")}
              icon={<AntDesign name="mail" size={24} color={iconsColor} />}
            />
            <ButtonItems
              title={t("settings:pay")}
              icon={<AntDesign name="wallet" size={24} color={iconsColor} />}
            />
            <ButtonItems
              title={t("settings:connect")}
              icon={<AntDesign name="wifi" size={24} color={iconsColor} />}
            />
          </View>
          <View className="px-4 py-2">
            {errorMsg && <Text className="text-red-400">{errorMsg}</Text>}

            <View className="my-2 rounded p-4 bg-white">
              <ItemsData
                title={t("settings:description")}
                name={description}
                type="description"
                onPress={handleUdate}
                setName={setDescription}
                isLoading={isLoading}
              />
              <ItemsData
                title={t("settings:username")}
                name={username}
                type="username"
                onPress={handleUdate}
                setName={setUsername}
                isLoading={isLoading}
              />
              <ItemsData
                title={t("settings:phone")}
                name={phone}
                type="phone"
                onPress={handleUdate}
                setName={setPhone}
                isLoading={isLoading}
              />
            </View>
            <View className="my-2 rounded p-6 bg-white">
              <ItemsData
                title={t("settings:website")}
                name={website}
                type="website"
                onPress={handleUdate}
                setName={setWebsite}
                isLoading={isLoading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserInfo;
