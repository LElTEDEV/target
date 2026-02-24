import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Target() {
  return (
    <View>
      <Text>Target</Text>
      <Button
        title="Meta"
        onPress={() => router.navigate("/transactions/2502")}
      />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
