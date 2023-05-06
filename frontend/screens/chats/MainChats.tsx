import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { convrsations } from "../../utils/users";
import { styles } from "../../utils/directionFun";
import Messages from "../../components/home/Messages";
import ItemButton from "../../components/home/ItemButton";
import Story from "../../components/home/Story";
import { getData } from "../../utils/getData";
import { axiosClient } from "../../utils/connect";

const MainChats = ({ navigation }: any) => {
  const [sellectedChat, setSellectedChat] = useState<
    { id: string; isGroup: boolean }[] | []
  >([]);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteMsg, setDeleteMsg] = useState<string>("");

  const { data, errMsg, isLoading, refetch } = getData("/conversation");

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async () => {
    setDeleteLoading(true);
    sellectedChat.map(async (chat) => {
      try {
        const { data } = await axiosClient.delete(
          `/conversation/group/${chat.id}`
        );
        setDeleteMsg(data.message);
      } catch (error) {
        setDeleteMsg("something went wrong");
        console.error(error);
      }
      setDeleteLoading(false);
      setSellectedChat([]);
      refetch();
    });
  };
  const unSellect = () => {
    setSellectedChat([]);
  };

  const handelUpdate = () => {
    if (data) {
      const group = data.find((d: ConvProps) => d._id === sellectedChat[0].id);
      if (group) {
        navigation.navigate("updateGroup", { group });
      }
    }
  };
  return (
    <View className="flex-1 bg-white ">
      <View className="pt-4 px-4">
        <FlatList
          ListHeaderComponent={() => (
            <View className="items-center">
              <TouchableOpacity className="h-14 w-14  flex items-center justify-center rounded-full bg-gray-300">
                <AntDesign name="plus" size={24} color="white" />
              </TouchableOpacity>
              <Text className="text-gray-400 capitalize">My Story</Text>
            </View>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={convrsations}
          renderItem={({ item }) => <Story name={item.name} />}
          contentContainerStyle={{ columnGap: 18, alignItems: "center" }}
          className=" h-fit"
        />
      </View>
      <View className="h-px bg-gray-300 w-full my-3"></View>
      {errMsg && (
        <Text className="text-red-400 text-center w-full px-4 capitalize mb-2">
          {errMsg}
        </Text>
      )}
      {isLoading && !errMsg ? (
        <ActivityIndicator color={"green"} />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View style={styles().rtl} className="pb-4 ">
                <ItemButton title="General" numOfNofication={2} />
                <ItemButton title="Group" numOfNofication={12} />
              </View>
              {sellectedChat.length > 0 && (
                <View style={styles().rtl} className="pb-2 justify-around">
                  {deleteLoading ? (
                    <ActivityIndicator color={"red"} />
                  ) : (
                    <TouchableOpacity onPress={() => handleDelete()}>
                      <AntDesign name="delete" size={24} color={"red"} />
                    </TouchableOpacity>
                  )}
                  {sellectedChat.length > 0 &&
                    sellectedChat.length <= 1 &&
                    sellectedChat[0].isGroup && (
                      <TouchableOpacity
                        disabled={deleteLoading}
                        onPress={() => handelUpdate()}
                      >
                        <AntDesign name="edit" size={24} color={"red"} />
                      </TouchableOpacity>
                    )}
                  <TouchableOpacity
                    disabled={deleteLoading}
                    onPress={() => unSellect()}
                  >
                    <AntDesign name="close" size={24} color={"red"} />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
          className="px-4"
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }: { item: ConvProps }) => (
            <Messages
              data={item}
              sellectedChat={sellectedChat}
              setSellectedChat={setSellectedChat}
            />
          )}
          initialNumToRender={5}
        />
      )}
    </View>
  );
};

export default MainChats;
