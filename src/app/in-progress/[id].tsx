import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { List } from "@/components/list";
import { Button } from "@/components/button";
import { Progress } from "@/components/progress";
import { PageHeader } from "@/components/page-header";
import { Transaction, TransactionProps } from "@/components/transaction";

import { TransactionTypes } from "@/utils/transaction-types";

const details = {
  current: "R$ 580,00",
  target: "R$ 1.790,00",
  percentage: 25,
};

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

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{ icon: "edit", onPress: () => {} }}
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
