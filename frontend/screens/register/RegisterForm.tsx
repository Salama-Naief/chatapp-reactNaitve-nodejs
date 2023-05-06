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
} from "react-native";
import React, { useState } from "react";
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

interface Props {
  placeholder: string;
  setValue: Function;
  value: string;
  type: string;
}
const InputItem = ({ placeholder, setValue, value, type }: Props) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <View
      className="items-center bg-gray-100  py-2 px-4 my-2 rounded-lg"
      style={styles().rtl}
    >
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => setValue(text)}
        value={value}
        className=" flex-1 text-[17px] "
        cursorColor={"gray"}
        secureTextEntry={type === "password" && !showPass ? true : false}
        autoComplete="birthdate-day"
      />
      {type === "password" && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)} className="">
          {!showPass ? (
            <Feather name="eye" size={22} color={iconsColor} />
          ) : (
            <Feather name="eye-off" size={22} color={iconsColor} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

//main function
const ProfileForm = ({ navigation }: any) => {
  const [genre, setGenre] = useState<string>("Male");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useReduxSelector((state) => state.user);
  const [photo, setPhoto] = useState<{ uri: any; type: any }>({
    uri: "",
    type: "",
  });
  const dispatch = useDispatch();

  const { handleChoosePhoto } = choosePhoto(
    ImagePicker.MediaTypeOptions.Images
  );
  console.log("user", user);
  React.useEffect(() => {
    if (user.user) {
      navigation.push("home");
    }
  }, []);

  const formSubmit = async (values: any, action: any) => {
    try {
      setErrorMsg("");

      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("username", values.username);
      formData.append("genre", genre);
      const medai = await handleChoosePhoto();
      if (medai?.type === "image") {
        const type = medai.uri.split(".");
        formData.append("avatar", {
          name: new Date() + "_avatar",
          uri: medai.uri,
          type: `${medai.type}/${type[type.length - 1]}`,
        });
      } else {
        return Alert.alert("You can only upload image");
      }
      setIsLoading(true);
      const { data } = await axiosClient.post(
        "/auth/local/register",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(AddUser(data));
      navigation.push("home");
      await AsyncStorage.setItem("@user", data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMsg("somthing went wrong");
      console.log("error", error);
    }
  };

  const handleChooseImage = async () => {
    const img = await handleChoosePhoto();
    setPhoto(img || { uri: "", type: "" });
  };
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
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
        {errorMsg && <Text className="text-red-400">{errorMsg}</Text>}
        <View className="absolute -bottom-1 -right-1 p-1 bg-main rounded-full">
          <TouchableOpacity onPress={() => handleChooseImage()}>
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          prithday: "",
        }}
        validationSchema={registerFromValidation}
        onSubmit={formSubmit}
      >
        {(props) => (
          <View className=" w-3/4">
            <InputItem
              placeholder="Username(required)"
              setValue={props.handleChange("username")}
              value={props.values.username}
              type="name"
            />
            {props.errors.username && (
              <Text className="text-red-400">{props.errors.username}</Text>
            )}
            <InputItem
              placeholder="Email(required)"
              setValue={props.handleChange("email")}
              value={props.values.email}
              type="email"
            />
            {props.errors.email && (
              <Text className="text-red-400">{props.errors.email}</Text>
            )}
            <InputItem
              placeholder="Password(required)"
              setValue={props.handleChange("password")}
              value={props.values.password}
              type="password"
            />
            {props.errors.password && (
              <Text className="text-red-400">{props.errors.password}</Text>
            )}
            <InputItem
              placeholder="ConfirmPassord(required)"
              setValue={props.handleChange("confirmPassword")}
              value={props.values.confirmPassword}
              type="password"
            />
            {props.errors.confirmPassword && (
              <Text className="text-red-400">
                {props.errors.confirmPassword}
              </Text>
            )}
            <View className="bg-gray-100 ">
              <Picker
                selectedValue={genre}
                onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>

            <TouchableOpacity
              onPress={props.handleSubmit}
              disabled={isLoading}
              className="px-4 py-3  rounded-full bg-main my-4"
            >
              <Text className="text-white font-bold text-[18px] text-center">
                {isLoading ? "loading..." : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ProfileForm;
