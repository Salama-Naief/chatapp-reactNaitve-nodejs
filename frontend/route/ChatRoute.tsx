import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import MainChats from "../screens/chats/MainChats";
import Chat from "../screens/chats/Chat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainHeader from "../components/headers/MainHeader";
import ChatHeader from "../components/headers/ChatHeader";
import ModalsData from "../utils/modalsData";
const Stack = createNativeStackNavigator();
const ChatRoute = () => {
  const { chatsMenuData } = ModalsData();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="chats"
        component={MainChats}
        options={{
          header: () => (
            <MainHeader screen="home" menuData={chatsMenuData} plus={false} />
          ),
        }}
      />
      {/*  <Stack.Screen
        name="chat"
        component={Chat}
        options={{
          header: () => <ChatHeader />,
        }}
      />*/}
    </Stack.Navigator>
  );
};

export default ChatRoute;
