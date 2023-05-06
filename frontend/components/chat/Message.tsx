import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { profile } from "../../Constants/images";
import { useReduxSelector } from "../../redux/store";
import SoundMessage from "./SoundMessage";
import ImagesMessage from "./ImagesMessage";
import VideoMessage from "./VideoMessage";
import { formatDistance } from "date-fns";

interface Props {
  data: MessageProps;
  isLoading: boolean;
}
const Message = ({ data, isLoading }: Props) => {
  const user = useReduxSelector((state) => state.user);

  return (
    <View className="w-full my-4">
      {isLoading ? (
        <ActivityIndicator color={"green"} />
      ) : (
        <View
          className=""
          style={
            user.user?._id === data.sender._id
              ? { flexDirection: "row-reverse", gap: 10 }
              : { flexDirection: "row", gap: 10 }
          }
        >
          {user.user?._id !== data.sender._id && (
            <Image
              source={{ uri: data.sender.avatar }}
              className="h-10 w-10 rounded-full"
            />
          )}
          <View
            className="flex-1 items-center"
            style={
              user.user?._id === data.sender._id
                ? { flexDirection: "row-reverse", gap: 10 }
                : { flexDirection: "row", gap: 10 }
            }
          >
            <View
              className={`${
                user.user?._id !== data.sender._id
                  ? "bg-stale-100 text-gray-600 rounded-b-2xl rounded-tr-2xl"
                  : "bg-Emerald-400 text-white h-fit rounded-t-2xl rounded-bl-2xl"
              }  flex-1 px-3 py-2 text-[16px] leading-7`}
            >
              {user.user?._id !== data.sender._id && (
                <Text className={`text-Emerald-400 text-sm mb-1`}>
                  {data.sender.username}
                </Text>
              )}
              {data.media?.map((item, index) => (
                <View key={index}>
                  {data.mediaType === "audio" ? (
                    <SoundMessage
                      uri={item}
                      baseColor={
                        user.user?._id === data.sender._id ? "#d4d4d4" : "gray"
                      }
                      mainColor={
                        user.user?._id === data.sender._id ? "white" : "#34d399"
                      }
                    />
                  ) : data.mediaType === "video" ? (
                    <VideoMessage uri={item} />
                  ) : data.mediaType === "image" ? (
                    <ImagesMessage data={item} />
                  ) : null}
                </View>
              ))}
              {data.content && (
                <Text
                  className={`${
                    user.user?._id !== data.sender._id
                      ? "bg-stale-100 text-gray-600 rounded-b-2xl rounded-tr-2xl"
                      : "bg-Emerald-400 text-white h-fit rounded-t-2xl rounded-bl-2xl"
                  }  flex-1 text-[16px] leading-7`}
                >
                  {data.content}
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
      <View
        style={
          user.user?._id !== data.sender._id
            ? { flexDirection: "row-reverse", gap: 10 }
            : { flexDirection: "row", gap: 10 }
        }
      >
        <Text className="text-gray-400 text-xs">
          {data.createdAt &&
            formatDistance(new Date(data.createdAt), Date.now())}
        </Text>
      </View>
    </View>
  );
};

export default Message;
