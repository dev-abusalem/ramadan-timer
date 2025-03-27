import { Stack } from "expo-router";
import ReduxProvider from "@/components/ReduxProvider";

export default function RootLayout() {
  return (
    <ReduxProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </ReduxProvider>
  );
}
