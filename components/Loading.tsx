import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { LoaderCircle } from "lucide-react-native";
import AppColors from "@/constants/Colors";
import { AppFonts } from "@/constants/AppFonts";

const LoadingButton = ({ children }: { children: React.ReactNode }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <TouchableOpacity style={styles.button} disabled>
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"],
              }),
            },
          ],
        }}
      >
        <LoaderCircle size={36} color={AppColors.white} />
      </Animated.View>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default LoadingButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    opacity: 0.6,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontFamily: AppFonts.Regular,
  },
});
