import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { Alert, StatusBar, View } from "react-native";

import { List } from "@/components/list";
import { Button } from "@/components/button";
import { HomeHeader } from "@/components/home-header";
import { Target, TargetProps } from "@/components/target";
import { useTargetDatabase } from "@/database/use-target-database";

const summary = {
  total: "R$ 2,680.00",
  input: { label: "Entradas", value: "R$ 6,184.00" },
  output: { label: "Saídas", value: "R$ 883.65" },
};

export default function Index() {
  const targetDatabase = useTargetDatabase();
  const [targets, setTargets] = useState<TargetProps[] | undefined>([]);

  async function fetchTargets(): Promise<TargetProps[] | undefined> {
    try {
      const response = await targetDatabase.listBySavedValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: String(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: String(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas.");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />

      <List
        data={targets}
        title="Metas"
        keyExtractor={(item) => String(item.id)}
        emptyMessage="Nenuma meta. Toque em nova meta para criar."
        renderItem={({ item }) => (
          <Target
            data={item}
            activeOpacity={0.6}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}
