import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Sound } from "expo-av/build/Audio";
import { AVPlaybackStatus, Audio } from "expo-av";
import SoundEffect from "./SoundEffect";
import { Ionicons } from "@expo/vector-icons";
import { getDurationFormatted } from "../../utils/getDurationFormatted";

interface Props {
  uri: string | undefined;
  baseColor: string;
  mainColor: string;
}
const SoundMessage = ({ uri, baseColor, mainColor }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackInstance, setPlaybackInstance] = useState<Sound | undefined>(
    undefined
  );
  const [duration, setDuration] = useState<number | undefined>(0);

  const [postionDuration, setPostionDuration] = useState<number | undefined>(0);

  const viewWidth =
    postionDuration && duration ? ` ${(postionDuration / duration) * 100}%` : 0;
  //change ui accoriding to paly Status update
  const _onPlaybackStatusUpdate = async (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
      }
    } else {
      setDuration(playbackStatus.durationMillis);
      setPostionDuration(playbackStatus.positionMillis);
      if (playbackStatus.isPlaying) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }

      if (playbackStatus.isBuffering) {
        console.log("buffering");
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        await playbackInstance?.unloadAsync();
        setIsPlaying(false);
      }
    }
  };
  const playAudio = async () => {
    try {
      const { sound: playbackInstance } = await Audio.Sound.createAsync(
        { uri: uri ? uri : "" },
        { shouldPlay: isPlaying },
        _onPlaybackStatusUpdate
      );
      setPlaybackInstance(playbackInstance);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const autioConfig = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          //interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          //interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: true,
        });
        playAudio();
      } catch (e) {
        console.log(e);
      }
    };
    autioConfig();
  }, []);

  //handle play puase audio
  //using replayAsnc rather than playAsync to raplay after finshing
  const handlePlayPause = async () => {
    isPlaying
      ? await playbackInstance?.pauseAsync()
      : await playbackInstance?.replayAsync();
  };

  return (
    <View className="">
      <View className="flex-row justify-between items-center">
        <View className="">
          <View className="flex-row  justify-between">
            <Text className="text-xs text-gray-500">
              {getDurationFormatted(postionDuration ?? 0)}
            </Text>
            <Text className="text-xs text-gray-500">
              {getDurationFormatted(duration ?? 0)}
            </Text>
          </View>
          <View className="relative">
            <SoundEffect color={baseColor} />

            <View
              className=" flex-row overflow-hidden absolute left-0 top-0"
              style={{
                width: viewWidth,
              }}
            >
              <SoundEffect color={mainColor} />
            </View>
          </View>
        </View>
        <View className="p-1.5 rounded-full bg-white">
          <TouchableOpacity onPress={() => handlePlayPause()}>
            {isPlaying ? (
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

export default SoundMessage;
