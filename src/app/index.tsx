import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text>Olá, expo router.</Text>
      <Button title="Meta" onPress={() => router.navigate("/target")} />
    </View>
  );
}
