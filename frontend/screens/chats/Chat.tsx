import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import * as FileSystem from "expo-file-system";
import { useNavigation, useRoute } from "@react-navigation/native";
import Message from "../../components/chat/Message";
import { messages } from "../../utils/users";
import { Feather } from "@expo/vector-icons";
import AudioClip from "../../components/chat/AudioClip";
import { Recording, RecordingStatus, Sound } from "expo-av/build/Audio";
import { getDurationFormatted } from "../../utils/getDurationFormatted";
import OptionsFilesModal from "../../components/chat/OptionsFilesModal";
import CameraModal from "../../components/Modals/CameraModal";
import { getData } from "../../utils/getData";
import { date } from "yup";
import { SoundFuns } from "../../utils/soundFuns";
import SoundMessage from "../../components/chat/SoundMessage";
import { axiosClient } from "../../utils/connect";
import VideoMessage from "../../components/chat/VideoMessage";
import ImagesMessage from "../../components/chat/ImagesMessage";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AddConv } from "../../redux/coversation";
import { ENDPOINT } from "../../Constants/EndPoint";
import { useReduxSelector } from "../../redux/store";

//import * as Sharing from 'expo-sharing';

let socket: any = null;

const Chat = () => {
  const route = useRoute();
  const user = useReduxSelector((state) => state.user);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [sendIsLoading, setSendIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [media, setMedai] = useState<{ uri: string; type: string | undefined }>(
    { uri: "", type: "" }
  );
  const [userOnline, setUserOnline] = useState<{}>();
  const [optopsFileModal, setOptionFileModal] = useState<boolean>(false);

  //get coversation messages

  const {
    data,
    errMsg: errorMsg,
    isLoading,
    refetch,
  } = getData(`/messages/${route.params?.id}`);

  const [messages, setMessages] = useState<MessageProps[] | []>([]);
  const {
    errMsg,
    setErrMsg,
    handleRecordButtonPress,
    newRecordings,
    recordingDuration,
    recordingStatus,
    setNewRecordings,
  } = SoundFuns();

  useEffect(() => {
    setMessages(data);
  }, [data]);
  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.emit("identity", user.user?._id);
    socket.emit("subscribe", route.params?.id);
    //socket.emit("join chat", route.params?.id);
  }, []);

  useEffect(() => {
    socket.on("room", (newMessageRecieved: any) => {
      console.log("rooooom====>", newMessageRecieved);
      if (route.params?.id === newMessageRecieved.conversationId._id) {
        const msg = messages.find((m) => m._id === newMessageRecieved._id);
        console.log("msg", msg);
        setMessages(msg ? messages : (prev) => [...prev, newMessageRecieved]);
      }
    });
  });

  //handle send message functionlity
  const handleSend = async () => {
    try {
      const formData = new FormData();
      formData.append("conversationId", route.params?.id);
      if (message) {
        formData.append("content", message);
      }
      if (newRecordings) {
        const typeArray = newRecordings?.split(".");
        const voiceType = typeArray[typeArray?.length - 1];
        console.log("newRecordings dd", newRecordings);
        formData.append("audios", {
          name: new Date() + "_audio",
          uri: newRecordings,
          type: `audio/${voiceType}`,
        });
      } else if (media.uri) {
        if (media.type === "image") {
          const typeArray = media.uri?.split(".");
          const type = typeArray[typeArray?.length - 1];
          formData.append("images", {
            name: new Date() + "_image",
            uri: media.uri,
            type: `image/${type}`,
          });
        } else if (media.type === "video") {
          const typeArray = media.uri?.split(".");
          const type = typeArray[typeArray?.length - 1];
          formData.append("videos", {
            name: new Date() + "_video",
            uri: media.uri,
            type: `video/${type}`,
          });
        }
      }
      setSendIsLoading(true);
      const { data: newData } = await axiosClient.post("/messages", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      if (newData.message) {
        setErrMsg(newData.message);
        setSendIsLoading(false);
        console.log("newData.message", newData.message);
        return;
      }

      console.log("new message", newData);
      socket.emit("newMessage", newData);
      setMessages([...messages, newData]);

      //refetch();
      setSendIsLoading(false);
      setMessage("");
      setNewRecordings(null);
      setMedai({ uri: "", type: "" });
    } catch (error) {
      setSendIsLoading(false);
      console.log("error", error.message);
    }
  };

  const handleClose = () => {
    setNewRecordings(null);
    setMedai({ uri: "", type: "" });
  };
  return (
    <View className="bg-white flex-1 px-4">
      <View className="flex-1">
        {isLoading && !errorMsg ? (
          <ActivityIndicator color={"green"} />
        ) : (
          <FlatList
            data={messages}
            renderItem={({ item }: { item: MessageProps }) => (
              <Message isLoading={isLoading} data={item} />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
        {(newRecordings || media.uri) && (
          <View className="bg-gray-900 px-4 py-2 rounded-xl">
            <TouchableOpacity
              onPress={() => handleClose()}
              className="justify-end items-end my-4"
            >
              <AntDesign name="closecircleo" size={24} color="white" />
            </TouchableOpacity>
            {newRecordings ? (
              <View>
                <SoundMessage
                  uri={newRecordings}
                  baseColor="gray"
                  mainColor="white"
                />
              </View>
            ) : media.uri ? (
              <View className="">
                {media.type === "image" ? (
                  <ImagesMessage data={media.uri} />
                ) : media.type === "video" ? (
                  <VideoMessage uri={media.uri} />
                ) : null}
              </View>
            ) : null}
          </View>
        )}
      </View>

      {cameraOpen && (
        <CameraModal cameraOpen={cameraOpen} setCameraOpen={setCameraOpen} />
      )}
      {errMsg && <Text className="text-red-400">{errMsg}</Text>}
      <View className="rounded-full shadow-lg w-full p-2 bg-gray-50 mb-2 flex-row items-end">
        <TouchableOpacity
          onPress={() => {
            setOptionFileModal(true);
            setMedai({ uri: "", type: "" });
          }}
          className="active:bg-gray-200 p-2 roundex-full"
        >
          <Feather name="paperclip" size={24} color="gray" />
        </TouchableOpacity>
        <TextInput
          value={message}
          multiline
          onChangeText={(text) => setMessage(text)}
          className="flex-1 p-2 text-[16px] max-h-14"
          placeholder="Type a Message"
          cursorColor={"gray"}
        />
        <TouchableOpacity
          onPress={() => handleRecordButtonPress()}
          className="active:bg-gray-200 p-2 roundex-full relative"
        >
          {recordingStatus === "recording" && (
            <View className="absolute -top-8 w-10 whitespace-nowrap left-0 p-1 py-2 justify-center items-center rounded-full bg-main">
              <Text className="text-white">
                {getDurationFormatted(recordingDuration)}
              </Text>
            </View>
          )}
          <Feather
            name="mic"
            size={24}
            color={recordingStatus === "recording" ? "#fb7185" : "#38bdf8"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSend()}
          disabled={sendIsLoading}
          className="active:bg-gray-200 p-2 roundex-full"
        >
          {sendIsLoading ? (
            <ActivityIndicator color={"green"} />
          ) : (
            <Feather name="send" size={24} color="#57d382" />
          )}
        </TouchableOpacity>
      </View>
      <OptionsFilesModal
        setMedia={setMedai}
        modal={optopsFileModal}
        convId={route.params?.id}
        setModal={setOptionFileModal}
      />
    </View>
  );
};

export default Chat;
