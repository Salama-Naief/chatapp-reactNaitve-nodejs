import React, { useState, useEffect } from "react";
import { axiosClient } from "./connect";

export const getData = (api: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [data, setData] = useState<any>(null);

  const getDataFun = async () => {
    try {
      setIsLoading(true);
      setErrMsg("");
      const { data } = await axiosClient.get(api);
      if (data.message) {
        setErrMsg(data.message);
        setIsLoading(false);
      }
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log("get data error", error);
      setErrMsg("something went wrong");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDataFun();
  }, []);

  const refetch = () => {
    getDataFun();
  };
  return {
    data,
    isLoading,
    errMsg,
    refetch,
  };
};
