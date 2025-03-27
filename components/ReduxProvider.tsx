import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "HindSiliguri-Regular": require("../assets/fonts/HindSiliguri-Regular.ttf"),
        "HindSiliguri-Bold": require("../assets/fonts/HindSiliguri-Bold.ttf"),
        "HindSiliguri-Medium": require("../assets/fonts/HindSiliguri-Medium.ttf"),
        "HindSiliguri-SemiBold": require("../assets/fonts/HindSiliguri-SemiBold.ttf"),
        "HindSiliguri-Light": require("../assets/fonts/HindSiliguri-Light.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
