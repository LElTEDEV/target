import { Alert, View } from "react-native";
import { useCallback, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { List } from "@/components/list";
import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Progress } from "@/components/progress";
import { PageHeader } from "@/components/page-header";
import { Transaction, TransactionProps } from "@/components/transaction";

import { TransactionTypes } from "@/utils/transaction-types";
import { numberToCurrency } from "@/utils/number-to-currency";

import { useTargetDatabase } from "@/database/use-target-database";

const transactions: TransactionProps[] = [
  {
    id: "1",
    value: "R$ 300",
    date: "25/02/2026",
    description: "Adiantamento de salário",
    type: TransactionTypes.Input,
  },
  {
    id: "2",
    value: "R$ 120",
    date: "22/02/2026",
    type: TransactionTypes.Output,
    description: "Conta de luz",
  },
];

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    percentage: 0,
    target: "R$ 0,00",
    current: "R$ 0,00",
  });

  const targetDatabase = useTargetDatabase();

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(id));

      if (response === null) return;

      setDetails({
        name: response.name,
        percentage: response?.percentage,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response?.amount),
      });
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível visualizar os detalhes dessa meta.",
      );
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) return <Loading />;

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate(`/target?id=${id}`),
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transactions/${id}`)}
      />
    </View>
  );
}
