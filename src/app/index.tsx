import { fontFamily } from "@/theme/font-family";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text style={{ fontFamily: fontFamily.bold }}>Olá, expo router.</Text>
      <Button title="Meta" onPress={() => router.navigate("/target")} />
    </View>
  );
}
