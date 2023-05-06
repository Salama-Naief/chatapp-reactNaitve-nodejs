import { NavigationContainer } from "@react-navigation/native";
import "./localization/i18n";
import MainRoute from "./route/MainRoute";
import { View } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./screens/chats/Chat";
import ChatHeader from "./components/headers/ChatHeader";
import CameraScreen from "./screens/CameraScreen";
import MediaLibScreen from "./screens/MediaLibScreen";
import LocationScreen from "./screens/LocationScreen";
import { CustomBackBtn } from "./components/Settings/Headers";
import CallingScreen from "./screens/call/CallingScreen";
import { Register, RegisterForm } from "./screens/register";
import { Login, LoginForm } from "./screens/login";
import CreateGroupModal from "./components/Modals/CreateGroupModal";
import UpdateGroup from "./components/Modals/UpdateGroupModal";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/*  <MainRoute />*/}
        <Stack.Navigator>
          <Stack.Screen
            name={"register"}
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"home"}
            component={MainRoute}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{
              header: () => <ChatHeader />,
            }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="camera"
              component={CameraScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="media"
              component={MediaLibScreen}
              options={{ title: "Photo&Video Library" }}
            />
            <Stack.Screen
              name="location"
              component={LocationScreen}
              options={{
                title: "Location",
                headerTitleStyle: {
                  color: "white",
                },
                headerLeft: () => (
                  <CustomBackBtn more={false} color={"white"} />
                ),
                headerStyle: {
                  backgroundColor: "#57d382",
                },
              }}
            />
            <Stack.Screen
              name="calling"
              component={CallingScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
          <Stack.Screen
            name={"login"}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"registerForm"}
            component={RegisterForm}
            options={{ title: "", headerShadowVisible: false }}
          />
          <Stack.Screen
            name={"loginForm"}
            component={LoginForm}
            options={{ title: "", headerShadowVisible: false }}
          />
          <Stack.Screen
            name={"createGroup"}
            component={CreateGroupModal}
            options={{
              title: "",
              headerShadowVisible: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name={"updateGroup"}
            component={UpdateGroup}
            options={{
              title: "",
              headerShadowVisible: false,
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
