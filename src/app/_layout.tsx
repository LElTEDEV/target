import { Suspense } from "react";
import { Stack } from "expo-router";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { SQLiteProvider } from "expo-sqlite";

import { colors } from "@/theme/colors";
import { migrate } from "@/database/migrate";
import { Loading } from "@/components/loading";

export default function Layout() {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontLoaded) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider databaseName="target.db" onInit={migrate} useSuspense>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              flex: 1,
              backgroundColor: colors.white,
            },
            animation: "none",
          }}
        />
      </SQLiteProvider>
    </Suspense>
  );
}
