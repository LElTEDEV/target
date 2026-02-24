import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Transactions() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Transações da meta: {id}</Text>
      <Button
        title="Progresso"
        onPress={() => router.navigate(`/in-progress/${id}`)}
      />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
