import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getDurationFormatted } from "./getDurationFormatted";
import { Audio } from "expo-av";
import { Recording, RecordingStatus, Sound } from "expo-av/build/Audio";
interface RecoringsProps {
  sound: Sound | undefined;
  file: string | null | undefined;
}

export const SoundFuns = () => {
  const [errMsg, setErrMsg] = useState<string>("");
  const [recording, setRecording] = useState<Recording | undefined>(undefined);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [newRecordings, setNewRecordings] = useState<string | null>(null);
  const [audioPermission, setAudioPermission] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  useEffect(() => {
    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync()
        .then((permission) => {
          console.log("Permission Granted: " + permission.granted);
          setAudioPermission(permission.granted);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Call function to get permission
    getPermission();
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  //change ui accoriding to paly Status update
  const _onRecordingStatusUpdate = async (recordingStatus: RecordingStatus) => {
    if (!recordingStatus.canRecord) {
      setErrMsg("You can not Recording plz try again!");
    } else {
      setRecordingDuration(recordingStatus.durationMillis);
      if (recordingStatus.isRecording) {
        setRecordingStatus("recording");
      } else {
        setRecordingStatus("stoped");
      }
    }
  };

  //start recording function
  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        setErrMsg("");
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
          _onRecordingStatusUpdate
        );

        setRecording(recording);
      }
      {
        setErrMsg("check your audioPermission");
      }
    } catch (error) {
      setErrMsg("Failed to start recording" + error);
    }
  }
  //stop recording function
  async function stopRecording() {
    if (recordingStatus === "recording") {
      setRecording(undefined);
      await recording?.stopAndUnloadAsync();
      await recording?.createNewLoadedSoundAsync();

      const newRecord = await recording?.createNewLoadedSoundAsync();

      setNewRecordings(recording?.getURI());
      setRecording(undefined);
      setRecordingStatus("stopped");
    }
  }

  //function that called when you press mic button
  async function handleRecordButtonPress() {
    if (recording) {
      //const audioUri = await stopRecording(recording);
      await stopRecording();
      setErrMsg("");
    } else {
      await startRecording();
    }
  }
  return {
    errMsg,
    newRecordings,
    handleRecordButtonPress,
    recordingDuration,
    recordingStatus,
    setNewRecordings,
    setErrMsg,
  };
};
