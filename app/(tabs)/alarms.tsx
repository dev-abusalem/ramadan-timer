import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import { useState } from "react";
import { Bell } from "lucide-react-native";
import AuthHeader from "@/components/AuthHeader";
import AppColors from "@/constants/Colors";
import { AppFonts } from "@/constants/AppFonts";
import { toBengaliDigits } from "@/lib/toBengaliDigits";
type AlarmKeys =
  | "fajr"
  | "dhuhr"
  | "asr"
  | "maghrib"
  | "isha"
  | "sehri"
  | "iftar";

export default function AlarmsScreen() {
  const [alarms, setAlarms] = useState<Record<AlarmKeys, boolean>>({
    fajr: true,
    dhuhr: false,
    asr: false,
    maghrib: true,
    isha: false,
    sehri: true,
    iftar: true,
  });
  const toggleAlarm = (name: AlarmKeys) => {
    setAlarms((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <AuthHeader image={require("../../assets/images/alarm.jpg")}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <Bell size={32} color={AppColors.primary} />
          </View>
          <Text style={styles.title}>অ্যালার্ম সেটিংস</Text>
        </View>
      </AuthHeader>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: AppColors.white }]}>
          নামাজের অ্যালার্ম
        </Text>
        <AlarmItem
          name="ফজর"
          time={toBengaliDigits("4:52")}
          enabled={alarms.fajr}
          onToggle={() => toggleAlarm("fajr")}
        />
        <AlarmItem
          name="যোহর"
          time={toBengaliDigits("12:05")}
          enabled={alarms.dhuhr}
          onToggle={() => toggleAlarm("dhuhr")}
        />
        <AlarmItem
          name="আসর"
          time={toBengaliDigits("3:45")}
          enabled={alarms.asr}
          onToggle={() => toggleAlarm("asr")}
        />
        <AlarmItem
          name="মাগরিব"
          time={toBengaliDigits("5:55")}
          enabled={alarms.maghrib}
          onToggle={() => toggleAlarm("maghrib")}
        />
        <AlarmItem
          name="ইশা"
          time={toBengaliDigits("7:15")}
          enabled={alarms.isha}
          onToggle={() => toggleAlarm("isha")}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: AppColors.text }]}>
          রমজানের অ্যালার্ম
        </Text>
        <AlarmItem
          name="সেহরি"
          time={toBengaliDigits("4:15")}
          enabled={alarms.sehri}
          onToggle={() => toggleAlarm("sehri")}
        />
        <AlarmItem
          name="ইফতার"
          time={toBengaliDigits("6:15")}
          enabled={alarms.iftar}
          onToggle={() => toggleAlarm("iftar")}
        />
      </View>
    </ScrollView>
  );
}

function AlarmItem({ name, time, enabled, onToggle }: any) {
  return (
    <View style={styles.alarmItem}>
      <View>
        <Text style={styles.alarmName}>{name}</Text>
        <Text style={styles.alarmTime}>{time}</Text>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: "#ddd", true: "#4CAF50" }}
        thumbColor={enabled ? "#fff" : "#f4f3f4"}
      />
    </View>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    alignItems: "center",
    backgroundColor: AppColors.white,
    borderRadius: 50,
    padding: 10,
  },
  title: {
    color: AppColors.white,
    fontSize: 24,
    fontFamily: AppFonts.Bold,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: AppFonts.Bold,

    marginBottom: 12,
  },
  alarmItem: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alarmName: {
    fontSize: 18,
    fontFamily: AppFonts.Regular,
    color: AppColors.black,
  },
  alarmTime: {
    fontSize: 18,
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: 4,
  },
});
