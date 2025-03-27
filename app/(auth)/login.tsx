import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Moon } from "lucide-react-native";
import AppColors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import LoadingButton from "@/components/Loading";
import { AppFonts } from "@/constants/AppFonts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { signIn } from "@/redux/slices/authSlice";
export default function LoginScreen() {
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const resultAction = await dispatch(signIn({ email, password }));
      if (signIn.fulfilled.match(resultAction)) {
        router.replace("/(tabs)");
      } else {
        alert(resultAction.payload || "Login failed!");
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Moon size={40} color="#ffffff" />
        </View>
        <Text style={styles.title}>ইসলামিক সময়সূচী</Text>
        <Text style={styles.subtitle}>সালাত, ইফতার এবং সাহরি টাইমার</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="ইমেইল"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="পাসওয়ার্ড"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {loading ? (
          <LoadingButton>লোডিং হচ্ছে</LoadingButton>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>লগইন</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.linkText}>নতুন অ্যাকাউন্ট তৈরি করুন</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  icon: {
    alignItems: "center",
    backgroundColor: AppColors.primary,
    borderRadius: 50,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: AppFonts.Bold,
    color: AppColors.text,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: AppFonts.Regular,
    color: AppColors.lightText,
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: AppFonts.Regular,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: AppFonts.Regular,
  },
  linkText: {
    color: "#4CAF50",
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    fontFamily: AppFonts.SemiBold,
  },
});
