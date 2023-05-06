import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLiberary from "expo-media-library";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getDurationFormatted } from "../../utils/getDurationFormatted";

interface Props {
  setCameraOpen?: Function;
  cameraOpen?: boolean;
}

interface PictureProps {
  height: number;
  uri: string;
  width: number;
}
interface photosProps {
  albumId: string;
  creationTime: Date;
  duration: number;
  filename: string;
  height: number;
  id: string;
  mediaType: string;
  modificationTime: Date;
  uri: string;
  width: number;
}
const { width, height } = Dimensions.get("screen");
const iconsColor = "#e2e8f0";

const CameraModal = ({ setCameraOpen, cameraOpen }: Props) => {
  const [type, setType] = useState(CameraType.back);
  const [vedioRecordMode, setVedioRecordMode] = useState<string>("stop");
  const [mode, setMode] = useState<string>("picture");
  const [photos, setPhotos] = useState<PictureProps[]>([]);
  const [tackedImage, setTackedImage] = useState<PictureProps | null>(null);
  const [tackedVideo, setTackedVideo] = useState<any>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const camera = useRef<Camera>(null);
  const [flashMode, setFlashMode] = useState<number | FlashMode | undefined>(0);
  const [camreraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    Camera.useMicrophonePermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLiberary.usePermissions();

  console.log("fleshmode", flashMode);
  console.log("tackedImage", tackedImage);
  console.log("mediaPermission", mediaPermission);
  console.log("microphonePermission", microphonePermission);
  useEffect(() => {
    const getPermissions = async () => {
      MediaLiberary.requestPermissionsAsync();
      if (!camreraPermission?.granted) {
        await requestCameraPermission();
      }
      if (!mediaPermission?.granted) {
        await requestMediaPermission();
      }
      if (!microphonePermission?.granted) {
        await requestMicrophonePermission();
      }
    };
    getPermissions();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const tackPicture = async () => {
    if (mode === "picture") {
      if (camera.current) {
        try {
          let options = {
            quality: 1,
            base64: true,
            exif: false,
          };
          const picture = await camera.current.takePictureAsync(options);
          setTackedImage(picture);
        } catch (error) {
          Alert.alert("error in takeing picture");
        }
      }
    } else {
      setMode("picture");
    }
  };

  //toggle the flashmode function
  const toggleFlashmode = () => {
    if (flashMode === 0) {
      setFlashMode(1);
    } else if (flashMode === 1) {
      setFlashMode(0);
    } else {
      setFlashMode(3);
    }
  };
  //saving Image function
  const savePicture = async () => {
    if (tackedImage) {
      try {
        await MediaLiberary.saveToLibraryAsync(tackedImage.uri);
        setTackedImage(null);
      } catch (error) {
        Alert.alert("can not save image" + error);
      }
    }
  };

  //switch to video mode
  const loadPictures = async () => {
    try {
      const photos = await MediaLiberary.getAssetsAsync({
        mediaType: mode === "picture" ? "photo" : "video",
      });
      console.log("photos", photos);
      setPhotos(photos.assets);
    } catch (err) {
      Alert.alert("can not load photos");
    }
  };
  //start video recording
  const startVideoRecording = async () => {
    if (mode === "video") {
      if (camera.current) {
        try {
          const video = await camera.current.recordAsync();
          setTackedVideo(video);
          setVedioRecordMode("recording");
          console.log("video", video);
        } catch (err) {
          console.log("rroorr", err);
          setVedioRecordMode("stop");
        }
      }
    } else {
      setMode("video");
    }
  };

  //start video recording
  const stopVideoRecording = async () => {
    if (camera.current) {
      camera.current.stopRecording();
      setVedioRecordMode("stop");
    }
  };
  console.log("tacking Video", tackedVideo);
  console.log("mode", mode);
  console.log("video Mode", vedioRecordMode);
  return (
    <Modal visible={cameraOpen}>
      <SafeAreaView>
        <View className="absolute top-0 left-0">
          {tackedImage ? (
            <View style={{ height, width }} className="bg-black relative">
              <Image
                source={{
                  uri: tackedImage?.uri,
                  width,
                  height,
                }}
                resizeMode="center"
              />
              <View className="flex-row absolute bottom-6 left-0 justify-between w-full p-4 bg-black">
                <TouchableOpacity onPress={() => setTackedImage(null)}>
                  <Ionicons
                    name="repeat-outline"
                    size={30}
                    color={iconsColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => savePicture()}>
                  <Text className="text-white text-xl">{"Save"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Camera
              flashMode={flashMode}
              type={type}
              style={{ width, height }}
              ref={camera}
            >
              <View className="flex-row justify-between p-4 flex-1">
                <TouchableOpacity onPress={() => setCameraOpen(false)}>
                  <Ionicons name="close" size={30} color={iconsColor} />
                </TouchableOpacity>
                <View>
                  {mode === "video" && (
                    <Text
                      className={`${
                        vedioRecordMode === "recording"
                          ? "text-red-400"
                          : "text-white"
                      }`}
                    >
                      {getDurationFormatted(videoDuration)}
                    </Text>
                  )}
                </View>
                <View>
                  {flashMode === 1 ? (
                    <TouchableOpacity onPress={() => toggleFlashmode()}>
                      <Ionicons
                        name="ios-flash-outline"
                        size={30}
                        color={iconsColor}
                      />
                    </TouchableOpacity>
                  ) : flashMode === 3 ? (
                    <TouchableOpacity onPress={() => toggleFlashmode()}>
                      <Ionicons
                        name="ios-flash-outline"
                        size={30}
                        color={"orange"}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => toggleFlashmode()}>
                      <Ionicons
                        name="ios-flash-off-outline"
                        size={30}
                        color={iconsColor}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/** bottom section */}

              <View className="mb-8">
                {photos.length > 0 && (
                  <>
                    <TouchableOpacity
                      className="justify-end items-end px-4"
                      onPress={() => setPhotos([])}
                    >
                      <Ionicons name="close" size={30} color={iconsColor} />
                    </TouchableOpacity>

                    <FlatList
                      className="mb-3 p-0 bg-black"
                      horizontal={true}
                      data={photos}
                      renderItem={({ item }) => (
                        <Image
                          source={{ uri: item.uri }}
                          className="w-24 h-20"
                          resizeMode="contain"
                        />
                      )}
                      contentContainerStyle={{ columnGap: 5 }}
                    />
                  </>
                )}
                <View className="flex-row justify-between px-4 pb-10">
                  <TouchableOpacity onPress={() => loadPictures()}>
                    <Ionicons
                      name="images-outline"
                      size={26}
                      color={iconsColor}
                    />
                  </TouchableOpacity>
                  <View
                    className="gap-x-3 items-center"
                    style={
                      mode === "picture"
                        ? { flexDirection: "row" }
                        : { flexDirection: "row-reverse" }
                    }
                  >
                    <TouchableOpacity onPress={() => tackPicture()}>
                      <Ionicons
                        name="camera-outline"
                        size={mode === "picture" ? 40 : 24}
                        color={iconsColor}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        vedioRecordMode === "recording"
                          ? stopVideoRecording()
                          : startVideoRecording()
                      }
                    >
                      <Ionicons
                        name="videocam-outline"
                        size={mode === "picture" ? 24 : 40}
                        color={iconsColor}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => toggleCameraType()}>
                    <Ionicons
                      name="camera-reverse-outline"
                      size={30}
                      color={iconsColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Camera>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default CameraModal;
