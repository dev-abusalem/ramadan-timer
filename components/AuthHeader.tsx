import {
  View,
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import React from "react";
interface HeaderProps {
  children: React.ReactNode;
  image?: ImageSourcePropType;
  height?: number;
}
export default function AuthHeader({ children, image, height }: HeaderProps) {
  return (
    <View>
      <View style={styles.imageContainer}>
        {image ? (
          <ImageBackground source={image} style={styles.backgroundImage} />
        ) : (
          <ImageBackground
            source={require("../assets/images/ramadan.jpg")}
            style={styles.backgroundImage}
          />
        )}

        <View style={styles.overlay} />
      </View>

      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#4CAF50",
    height: 200,
    top: 0,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
