import { colors } from "@/theme/colors";
import { Stack } from "expo-router";

export default function Layout() {
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
