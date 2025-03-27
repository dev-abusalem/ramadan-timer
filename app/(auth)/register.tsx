import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Moon } from "lucide-react-native";
import AppColors from "@/constants/Colors";
import { AppFonts } from "@/constants/AppFonts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { signUp } from "@/redux/slices/authSlice";
import LoadingButton from "@/components/Loading";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = async () => {
    try {
      const resultAction = await dispatch(signUp({ email, password, name }));

      if (signUp.fulfilled.match(resultAction)) {
        router.replace("/(tabs)");
        alert("নিবন্ধন সম্পন্ন হয়েছে।");
      } else {
        alert(resultAction.payload || "নিবন্ধন ব্যর্থ হয়েছে।");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Moon size={40} color="#ffffff" />
        </View>
        <Text style={styles.title}>নতুন অ্যাকাউন্ট</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="নাম"
          value={name}
          onChangeText={setName}
        />
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
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>রেজিস্টার</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.linkText}>অ্যাকাউন্ট আছে? লগইন করুন</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
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
    backgroundColor: AppColors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontFamily: AppFonts.Bold,
  },
  linkText: {
    color: AppColors.primary,
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    fontFamily: AppFonts.SemiBold,
  },
});
