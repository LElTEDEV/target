import { colors } from "@/theme/colors";
import { Stack } from "expo-router";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

export default function Layout() {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontLoaded) return;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          flex: 1,
          padding: 20,
          justifyContent: "center",
          backgroundColor: colors.white,
        },
        animation: "none",
      }}
    />
  );
}
