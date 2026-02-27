import dayjs from "dayjs";
import { Alert, StatusBar, View } from "react-native";
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
import { useTransactionDatabase } from "@/database/use-transaction-database";

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isFetching, setIsFetching] = useState(true);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [details, setDetails] = useState({
    name: "",
    percentage: 0,
    target: "R$ 0,00",
    current: "R$ 0,00",
  });

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionDatabase();

  async function removeTransaction(id: number) {
    try {
      await transactionsDatabase.remove(id);
      await fetchData();
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível remover essa transação. Tente novamente mais tarde",
      );
      console.log(error);
    }
  }

  function handleRemoveTransaction(id: number) {
    Alert.alert("Remover", "Deseja realmente remover?", [
      {
        style: "cancel",
        text: "Não",
      },
      {
        text: "Sim",
        onPress: () => removeTransaction(id),
      },
    ]);
  }

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

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.getTransactionsByDate(
        Number(id),
      );

      setTransactions(
        response.map((transaction) => ({
          id: String(transaction.id),
          date: dayjs(transaction.created_at).format("DD/MM/YYYY [às] HH:mm"),
          value: numberToCurrency(transaction.amount).replace("-", ""),
          description: transaction.observation,
          type:
            transaction.amount < 0
              ? TransactionTypes.Output
              : TransactionTypes.Input,
        })),
      );
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível coletar as transações dessa meta. Tente novamente mais tarde.",
      );
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();
    const fetchTransactionsPromise = fetchTransactions();

    await Promise.all([fetchDetailsPromise, fetchTransactionsPromise]);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) return <Loading />;

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <StatusBar barStyle="dark-content" />

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
          <Transaction
            data={item}
            onRemove={() => handleRemoveTransaction(Number(item.id))}
          />
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
