import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { convrsations, notification } from "../utils/users";
import Messages from "../components/home/Messages";
import { styles } from "../utils/directionFun";
import Notifications from "../components/home/Notifications";
import ItemButton from "../components/home/ItemButton";
import { useReduxSelector } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import { AddUser } from "../redux/user";
import { axiosClient } from "../utils/connect";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../Constants/EndPoint";

const HomeRoute = ({ navigation }: any) => {
  const user = useReduxSelector((state) => state.user);
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    /// const socket = socketIOClient(ENDPOINT);
    // socket.emit("setup", user);
    // socket.on("connected", () => setSocketConnected(true));
  }, []);

  console.log("response", response);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await AsyncStorage.getItem("@user");
        if (user) {
          dispatch(AddUser(JSON.parse(user)));
        } else {
          const { data } = await axiosClient.get("/users/me");
          dispatch(AddUser(JSON.parse(data)));
          await AsyncStorage.setItem("@user", JSON.stringify(data));
        }
      } catch (error) {
        console.log(error);
        Alert.alert("some thing went wrong please try agian");
        // navigation.push("login");
      }
    };
    getUser();
  }, []);
  return (
    <View
      className="flex-1 "
      style={{ backgroundColor: "white", paddingHorizontal: 10 }}
    >
      {/* <FlatList
        ListHeaderComponent={() => (
          <View style={styles().rtl} className="mb-2 ">
            <ItemButton title="Starred" numOfNofication={2} />
            <ItemButton title="Request" numOfNofication={2} />
          </View>
        )}
        className=" h-1/2 pt-4"
        showsVerticalScrollIndicator={false}
        data={convrsations}
        renderItem={({ item }) => (
          <Messages
            sellectedChat={[]}
            setSellectedChat={() => {}}
            data={item}
          />
        )}
        initialNumToRender={5}
        />*/}
      <View className="h-px bg-gray-300 w-full my-1"></View>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles().rtl} className="my-2 ">
            <ItemButton title="Notifications" numOfNofication={2} />
          </View>
        )}
        className="h-1/2"
        showsVerticalScrollIndicator={false}
        data={notification}
        renderItem={({ item }) => <Notifications data={item} />}
        initialNumToRender={5}
      />
    </View>
  );
};

export default HomeRoute;
