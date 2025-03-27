import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import AuthHeader from "@/components/AuthHeader";
import { AppFonts } from "@/constants/AppFonts";
import AppColors from "@/constants/Colors";
import { toBengaliDigits } from "@/lib/toBengaliDigits";

const PRAYER_TIMES = {
  fajr: "4:52",
  sunrise: "6:15",
  dhuhr: "12:05",
  asr: "3:45",
  maghrib: "5:55",
  isha: "7:15",
};

export default function PrayerTimesScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <AuthHeader>
        <View style={styles.header}>
          <Text style={styles.date}>
            {toBengaliDigits(
              format(currentTime, "EEEE, d MMMM yyyy", { locale: bn })
            )}
          </Text>
          <Text style={styles.time}>
            {toBengaliDigits(format(currentTime, "HH:mm:ss"))}
          </Text>
        </View>
      </AuthHeader>

      <View style={styles.prayerList}>
        <PrayerTimeCard name="ফজর" time={toBengaliDigits(PRAYER_TIMES.fajr)} />
        <PrayerTimeCard
          name="সূর্যোদয়"
          time={toBengaliDigits(PRAYER_TIMES.sunrise)}
        />
        <PrayerTimeCard
          name="যোহর"
          time={toBengaliDigits(PRAYER_TIMES.dhuhr)}
        />
        <PrayerTimeCard name="আসর" time={toBengaliDigits(PRAYER_TIMES.asr)} />
        <PrayerTimeCard
          name="মাগরিব"
          time={toBengaliDigits(PRAYER_TIMES.maghrib)}
        />
        <PrayerTimeCard name="ইশা" time={toBengaliDigits(PRAYER_TIMES.isha)} />
      </View>
    </ScrollView>
  );
}

function PrayerTimeCard({ name, time }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.prayerName}>{name}</Text>
      <Text style={styles.prayerTime}>{time}</Text>
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
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: 200,
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

  date: {
    color: "#fff",
    fontSize: 18,
    fontFamily: AppFonts.Regular,
    marginBottom: 8,
  },
  time: {
    color: "#fff",
    fontSize: 36,
    fontFamily: AppFonts.Bold,
  },
  prayerList: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  prayerName: {
    fontSize: 18,
    fontFamily: AppFonts.Regular,
    color: AppColors.text,
  },
  prayerTime: {
    fontSize: 20,
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
  },
});
