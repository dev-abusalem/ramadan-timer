import { AppFonts } from "@/constants/AppFonts";
import AppColors from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Clock, Moon, Bell, Settings } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: AppColors.black,
          borderTopWidth: 1,
          borderTopColor: "#eee",
          height: 60,
        },

        tabBarActiveTintColor: AppColors.primary,
        tabBarInactiveTintColor: AppColors.white,
        tabBarLabelStyle: {
          fontFamily: AppFonts.Regular,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "নামাজ",
          tabBarIcon: ({ color, size }) => <Clock size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ramadan"
        options={{
          title: "রমজান",
          tabBarIcon: ({ color, size }) => <Moon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="alarms"
        options={{
          title: "অ্যালার্ম",
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "সেটিংস",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
