import { View } from "react-native";
import { router } from "expo-router";

import { List } from "@/components/list";
import { Target } from "@/components/target";
import { Button } from "@/components/button";
import { HomeHeader } from "@/components/home-header";

const summary = {
  total: "R$ 2,680.00",
  input: { label: "Entradas", value: "R$ 6,184.00" },
  output: { label: "Saídas", value: "R$ 883.65" },
};

const targets = [
  {
    id: "1",
    name: "Apple Watch",
    current: "R$ 580,00",
    percentage: "50%",
    target: "R$ 1.790,00",
  },
  {
    id: "2",
    name: "Comprar uma cadeira ergonômica",
    current: "R$ 900,00",
    percentage: "75%",
    target: "R$ 1.200,00",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />

      <List
        data={targets}
        title="Metas"
        keyExtractor={(item) => item.id}
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
