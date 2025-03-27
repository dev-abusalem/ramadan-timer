import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { bn } from "date-fns/locale";
import AuthHeader from "@/components/AuthHeader";
import AppColors from "@/constants/Colors";
import { AppFonts } from "@/constants/AppFonts";
import { toBengaliDigits } from "@/lib/toBengaliDigits";

const RAMADAN_SCHEDULE = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  sehri: "4:15",
  iftar: "6:15",
}));

export default function RamadanScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <AuthHeader image={require("../../assets/images/ramadan2.jpg")}>
        <View style={styles.header}>
          <Text style={styles.title}>রমজান টাইমটেবিল</Text>
          <Text style={styles.subtitle}>১৪৪৫ হিজরি</Text>
        </View>
      </AuthHeader>

      <View style={styles.scheduleList}>
        {RAMADAN_SCHEDULE.map((schedule, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.dateInfo}>
              <Text style={styles.day}>
                {toBengaliDigits(schedule.day.toString())} রমজান
              </Text>
              <Text style={styles.gregorianDate}>
                {toBengaliDigits(
                  format(addDays(new Date(2024, 2, 11), index), "d MMMM", {
                    locale: bn,
                  })
                )}
              </Text>
            </View>
            <View style={styles.times}>
              <View style={styles.timeBlock}>
                <Text style={styles.timeLabel}>সেহরি</Text>
                <Text style={styles.timeValue}>
                  {toBengaliDigits(schedule.sehri)}
                </Text>
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.timeLabel}>ইফতার</Text>
                <Text style={styles.timeValue}>
                  {toBengaliDigits(schedule.iftar)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: AppColors.white,
    fontSize: 24,
    fontFamily: AppFonts.Bold,
  },
  subtitle: {
    color: AppColors.white,
    fontSize: 18,
    fontFamily: AppFonts.Regular,
    marginTop: 4,
  },
  scheduleList: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateInfo: {
    marginBottom: 12,
  },
  day: {
    fontSize: 18,
    fontFamily: AppFonts.Bold,
    color: AppColors.text,
  },
  gregorianDate: {
    fontSize: 14,
    fontFamily: AppFonts.Regular,
    color: AppColors.lightText,
  },
  times: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timeBlock: {
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: AppFonts.Regular,
    color: AppColors.lightText,
  },
  timeValue: {
    fontSize: 20,
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: 4,
  },
});
