import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LogOut, MapPin, Bell, Moon, Info } from "lucide-react-native";
import AuthHeader from "@/components/AuthHeader";
import AppColors from "@/constants/Colors";
import { useState } from "react";
import DivisionsAndDistrictsDropdown from "@/components/DivisionsAndDistrictsDropdown";
import { useDispatch } from "react-redux";
import { signOut } from "@/redux/slices/authSlice";

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [location, setLocation] = useState("লোকেশন নির্বাচন করুন");

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(signOut());
      if (signOut.fulfilled.match(resultAction)) {
        router.replace("/login");
      } else {
        alert(resultAction.payload || "Logout failed!");
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader image={require("../../assets/images/settings.jpg")}>
        <View style={styles.header}>
          <Text style={styles.title}>সেটিংস</Text>
        </View>
      </AuthHeader>

      <View style={styles.section}>
        <SettingsItem
          icon={<MapPin size={24} color={AppColors.primary} />}
          title="লোকেশন"
          subtitle={location}
          onPress={() => setLocation("নির্বাচন করুন !")}
        />
        {location === "নির্বাচন করুন !" && (
          <DivisionsAndDistrictsDropdown setLocation={setLocation} />
        )}
        <SettingsItem
          icon={<Bell size={24} color={AppColors.primary} />}
          title="নোটিফিকেশন"
          subtitle="অ্যালার্ম এবং রিমাইন্ডার"
        />
        <SettingsItem
          icon={<Moon size={24} color={AppColors.primary} />}
          title="থিম"
          subtitle="লাইট মোড"
        />
        <SettingsItem
          icon={<Info size={24} color={AppColors.primary} />}
          title="অ্যাপ সম্পর্কে"
          subtitle="ভার্সন ১.০.০"
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={24} color="#FF5252" />
        <Text style={styles.logoutText}>লগআউট</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

function SettingsItem({ icon, title, subtitle, onPress }: SettingsItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
      {icon}
      <View style={styles.settingsText}>
        <Text style={styles.settingsTitle}>{title}</Text>
        <Text style={styles.settingsSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: AppColors.white,
    fontSize: 24,
    fontFamily: "HindSiliguri-Bold",
  },
  section: {
    padding: 16,
    gap: 12,
    marginTop: 35,
  },
  settingsItem: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    elevation: 2,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingsText: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 18,
    fontFamily: "HindSiliguri-Regular",
    color: AppColors.text,
  },
  settingsSubtitle: {
    fontSize: 14,
    fontFamily: "HindSiliguri-Regular",
    color: AppColors.lightText,
    marginTop: 2,
  },
  logoutButton: {
    margin: 16,
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    elevation: 2,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: {
    fontSize: 18,
    fontFamily: "HindSiliguri-Regular",
    color: AppColors.error,
  },
});
