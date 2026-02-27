import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { Alert, StatusBar, View } from "react-native";

import { List } from "@/components/list";
import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { HomeHeader } from "@/components/home-header";
import { Target, TargetProps } from "@/components/target";

import { useTargetDatabase } from "@/database/use-target-database";
import { numberToCurrency } from "@/utils/number-to-currency";
import { useTransactionDatabase } from "@/database/use-transaction-database";

export default function Index() {
  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionDatabase();

  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[] | undefined>([]);
  const [summary, setSummary] = useState({
    total: "",
    input: { label: "Entradas", value: "" },
    output: { label: "Saídas", value: "" },
  });

  async function fetchTargets(): Promise<TargetProps[] | undefined> {
    try {
      const response = await targetDatabase.listBySavedValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: item.percentage.toFixed(0) + "%",
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas.");
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  async function fetchSummary() {
    try {
      const response = await transactionsDatabase.summary();

      if (!response) return;

      setSummary((prev) => ({
        input: { ...prev.input, value: numberToCurrency(response.input) },
        output: { ...prev.output, value: numberToCurrency(response.output) },
        total: numberToCurrency((response.input += response.output)),
      }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível puxar as informações do summary");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const fetchSummaryPromise = fetchSummary();

    const [targetData] = await Promise.all([
      targetDataPromise,
      fetchSummaryPromise,
    ]);

    setTargets(targetData);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) return <Loading />;

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
