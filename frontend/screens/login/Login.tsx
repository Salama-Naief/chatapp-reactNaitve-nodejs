import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { styles } from "../../utils/directionFun";
import { iconsColor } from "../../Constants/Constants";
import { useTranslation } from "react-i18next";
import { useReduxSelector } from "../../redux/store";

const Login = ({ navigation }: any) => {
  const { t } = useTranslation();
  const user = useReduxSelector((state) => state.user);

  React.useEffect(() => {
    if (user.user) {
      navigation.push("home");
    }
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-700 text-xl font-bold mb-8">
          {t("main:login_title")}
        </Text>
        <TouchableOpacity>
          <View
            className="gap-x-2 bg-red-500 items-center justify-center py-3 px-5 rounded-full "
            style={styles().rtl}
          >
            <AntDesign name="google" size={24} color="white" />
            <Text className="text-[18px] text-white">
              {" "}
              {t("main:login_goolge")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="my-4">
          <View
            className="gap-x-2 bg-indigo-500 items-center justify-center py-3 px-4 rounded-full "
            style={styles().rtl}
          >
            <FontAwesome name="facebook" size={24} color="white" />
            <Text className="text-[18px] text-white">
              {t("main:login_facebook")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className=""
          onPress={() => navigation.push("loginForm")}
        >
          <View
            className="gap-x-2 bg-gray-200 items-center justify-center py-3 px-8 rounded-full "
            style={styles().rtl}
          >
            <AntDesign name="mail" size={24} color={iconsColor} />
            <Text className="text-[18px] text-gray-700">
              {t("main:login_email")}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="my-4"
          onPress={() => navigation.push("register")}
        >
          <Text className="text-[16px] text-main">
            {t("main:dont_have_account")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
