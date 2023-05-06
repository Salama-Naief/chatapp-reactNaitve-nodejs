import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { LocationObject } from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const maps = useRef<any>(undefined);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      console.log("location", location);
      setLocation(location);
    })();
  }, []);

  const tackSnapshot = async () => {
    if (maps) {
      const snapshot = await maps.current?.takeSnapshot({
        width: 500,
        height: 500,
        format: "png",
        quality: 0.5,
        result: "file",
      });

      /*navigation.navigate("shat",{
        params: { id:route.params.id,snapshot },
        merge: true,
      })*/

      console.log("snapshot", snapshot);
    }
  };

  return (
    <View className="flex-1 relative">
      <MapView
        ref={maps}
        onPress={(loca) => {
          console.log("lo", loca);
        }}
        region={{
          latitude: location?.coords.latitude ?? 0,
          longitude: location?.coords.longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        className="h-full w-full"
      >
        <Marker
          coordinate={{
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
          }}
          title={"my Location"}
          description={"my location"}
        />
      </MapView>
      <View className="absolute flex-row bottom-5 items-center w-full left-0 px-4 justify-center">
        <TouchableOpacity
          onPress={() => tackSnapshot()}
          className="bg-gray-100 px-2 rounded"
        >
          <Text className="text-center  text-lg">Share Snapshot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationScreen;
