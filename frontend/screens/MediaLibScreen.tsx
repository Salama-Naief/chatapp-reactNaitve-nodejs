import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";

const MediaLibScreen = () => {
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [media, setMedia] = useState<MediaLibrary.Asset[]>([]);

  useEffect(() => {
    (async () => {
      if (!mediaPermission?.granted) {
        await requestMediaPermission();
      } else {
        const photoArr = await MediaLibrary.getAssetsAsync({
          mediaType: "photo",
        });
        const videoArr = await MediaLibrary.getAssetsAsync({
          mediaType: "video",
        });
        setMedia([...photoArr.assets, ...videoArr.assets]);
      }
    })();
  }, []);

  console.log("media", media);
  return (
    <View>
      <FlatList
        className=""
        numColumns={4}
        data={media}
        renderItem={({ item }) => (
          <>
            {item.mediaType === "photo" ? (
              <TouchableOpacity className="w-1/4">
                <Image
                  source={{ uri: item.uri }}
                  className="w-full h-32"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : null}
          </>
        )}
        contentContainerStyle={{}}
      />
    </View>
  );
};

export default MediaLibScreen;
