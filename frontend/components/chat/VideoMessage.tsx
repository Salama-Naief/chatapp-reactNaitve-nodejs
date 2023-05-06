import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AVPlaybackStatus, ResizeMode, Video, VideoState } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const VideoMessage = ({ uri }: { uri: string | undefined }) => {
  const video = React.useRef<Video>(null);
  const [status, setStatus] = React.useState<any>(undefined);

  const handlePlayPause = () => {
    status?.isPlaying
      ? video.current?._setFullscreen(false)
      : video.current?._setFullscreen(true);
    status?.isPlaying
      ? video.current?.pauseAsync()
      : video.current?.playAsync();
  };

  return (
    <View>
      <Video
        style={{ width: "100%", aspectRatio: "1/1" }}
        ref={video}
        source={{
          uri: uri ?? "",
        }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View className="flex-row justify-center items-center my-2">
        <View className="p-1.5 rounded-full bg-white flex-row">
          <TouchableOpacity onPress={() => handlePlayPause()}>
            {status?.isPlaying ? (
              <Ionicons name="pause" size={18} color="#4FBC87" />
            ) : (
              <Ionicons name="play" size={18} color="#4FBC87" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VideoMessage;
