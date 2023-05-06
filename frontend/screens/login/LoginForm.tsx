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
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { axiosClient } from "../../utils/connect";
import { useSelector, useDispatch } from "react-redux";
import {
  loginFromValidation,
  registerFromValidation,
} from "../../utils/yupValidation";
import { styles } from "../../utils/directionFun";
import { useReduxSelector } from "../../redux/store";
import { AddUser } from "../../redux/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [photo, setPhoto] = React.useState("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useReduxSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("user login", user);
  React.useEffect(() => {
    if (user.user) {
      navigation.push("home");
    }
  }, []);

  const formSubmit = async (values: any, action: any) => {
    try {
      setErrorMsg("");

      setIsLoading(true);
      const { data } = await axiosClient.post("/auth/local/login", values, {
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
      dispatch(AddUser(data));
      navigation.push("home");
      await AsyncStorage.setItem("@user", JSON.stringify(data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMsg("somthing went wrong");
      console.log("error", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl">Login</Text>
      <Text className="my-4 text-xl">Enter your email and password</Text>
      {errorMsg && <Text className="text-red-400">{errorMsg}</Text>}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginFromValidation}
        onSubmit={formSubmit}
      >
        {(props) => (
          <View className=" w-3/4">
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

            <TouchableOpacity
              onPress={props.handleSubmit}
              disabled={isLoading}
              className="px-4 py-3  rounded-full bg-main my-4"
            >
              <Text className="text-white font-bold text-[18px] text-center">
                {isLoading ? "loading..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ProfileForm;
