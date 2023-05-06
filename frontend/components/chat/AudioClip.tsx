import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { Ionicons } from "@expo/vector-icons";
import { getDurationFormatted } from "../../utils/getDurationFormatted";
import Svg, { Path } from "react-native-svg";
import SoundEffect from "./SoundEffect";

interface StateProps {
  isPlaying: boolean;
  playbackInstance: Sound | null;
  currentIndex: number;
  volume: number;
  isBuffering: boolean;
}

//playbackStateUpadate

const audioBookPlaylist = [
  {
    title: "Hamlet - Act I",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act II",
    author: "William Shakespeare",
    source: "Librivox",
    uri: "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
];

const AutioClip = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [playbackInstance, setPlaybackInstance] = useState<Sound | undefined>(
    undefined
  );
  const [duration, setDuration] = useState<number | undefined>(0);
  const [playableDuration, setPlayableDuration] = useState<number | undefined>(
    0
  );
  const [postionDuration, setPostionDuration] = useState<number | undefined>(0);

  const _onPlaybackStatusUpdate = async (playbackStatus: AVPlaybackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state
      if (
        playbackStatus.durationMillis &&
        playbackStatus.playableDurationMillis &&
        playbackStatus.positionMillis
      ) {
        setDuration(playbackStatus.durationMillis);

        setPostionDuration(playbackStatus.positionMillis);
      }
      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state

        setIsPlaying(true);
      } else {
        // Update your UI for the paused state
        setIsPlaying(false);
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
        console.log("buffering");
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?

        console.log("kjjkfjfdkfd", playbackInstance);
        await playbackInstance?.unloadAsync();

        setIsPlaying(false);
      }
    }
  };

  console.log("currentIndex", currentIndex);
  console.log("isPlaying", isPlaying);
  /*async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri: "http://foo/bar.mp3" },
      { shouldPlay: true }
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }*/
  // const onPlaybackStatusUpdate = () => {
  ////   setSound({ ...sound, isBuffering: true });
  // };

  const playAudio = async () => {
    try {
      const { sound: playbackInstance } = await Audio.Sound.createAsync(
        { uri: audioBookPlaylist[currentIndex].uri },
        { shouldPlay: isPlaying },
        _onPlaybackStatusUpdate
      );
      setPlaybackInstance(playbackInstance);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
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

  /* useEffect(() => {
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);*/

  const handlePlayPause = async () => {
    isPlaying
      ? await playbackInstance?.pauseAsync()
      : await playbackInstance?.replayAsync();
  };

  const handlePreviousTrack = async () => {
    let index = currentIndex;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      index > audioBookPlaylist.length - 1 ? (index -= 1) : (index = 0);
      console.log("index", index);
      setCurrentIndex(index);
      playAudio();
    }
  };

  const handleNextTrack = async () => {
    let index = currentIndex;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      index < audioBookPlaylist.length - 1 ? (index += 1) : (index = 0);

      console.log("index", index);
      setCurrentIndex(index);
      playAudio();
    }
  };
  return (
    <View>
      <Image
        source={{
          uri: "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
        }}
      />
      <View className="flex-row my-2">
        <TouchableOpacity onPress={() => handlePreviousTrack()}>
          <Ionicons name="ios-play-skip-back" size={24} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePlayPause()}>
          {isPlaying ? (
            <Ionicons name="ios-pause" size={24} color="#444" />
          ) : (
            <Ionicons name="ios-play-circle" size={24} color="#444" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextTrack}>
          <Ionicons name="ios-play-skip-forward" size={24} color="#444" />
        </TouchableOpacity>
      </View>
      {playbackInstance ? (
        <View className="flex-row">
          <Text>{audioBookPlaylist[currentIndex].title}</Text>
          <Text>{audioBookPlaylist[currentIndex].author}</Text>
          <Text>{audioBookPlaylist[currentIndex].source}</Text>
        </View>
      ) : null}
      <View className="flex-row justify-between">
        <Text>duration{getDurationFormatted(duration)}</Text>
        <Text>postionDuration{getDurationFormatted(postionDuration)}</Text>
      </View>
      <View className="w-full relative rounded h-1 overflow-hidden">
        <View
          className="absolute left-0 top-0 h-1 bg-main"
          style={{
            width: ` ${(postionDuration / duration) * 100}%`,
          }}
        ></View>
      </View>

      <View className="bg-main px-4 flex-row justify-between">
        <View className="relative ">
          <SoundEffect color="gray" />
          <View
            className="bg-gray-400 flex-row overflow-hidden absolute left-0 top-0"
            style={{
              width: ` ${(postionDuration / duration) * 100}%`,
            }}
          >
            <SoundEffect color="white" />
          </View>
        </View>
        <Text>Play</Text>
      </View>
    </View>
  );
};

export default AutioClip;
