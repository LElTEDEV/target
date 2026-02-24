import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Progresso da meta {id}</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
