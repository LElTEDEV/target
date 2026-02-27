import { useState } from "react";
import { Alert, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { PageHeader } from "@/components/page-header";
import { CurrencyInput } from "@/components/currency-input";
import { TransactionType } from "@/components/transaction-type";

import { useTransactionDatabase } from "@/database/use-transaction-database";

import { TransactionTypes } from "@/utils/transaction-types";

export default function Transactions() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const transactionsDatabase = useTransactionDatabase();

  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [type, setType] = useState(TransactionTypes.Input);

  async function handleCreate() {
    try {
      if (!amount || amount <= 0) {
        return Alert.alert(
          "Atenção!",
          "O valor precisa ser maior que 0 (zero).",
        );
      }

      setIsCreating(true);

      await transactionsDatabase.create({
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        target_id: Number(id),
        observation,
      });

      Alert.alert("Sucesso", "Nova transação criada com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Erro ao criar uma nova transação. Tente novamente mais tarde. ",
      );
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evite retirar."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={(value) => setAmount(value ?? 0)}
        />

        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          value={observation}
          onChangeText={setObservation}
        />

        <Button
          title="Salvar"
          onPress={handleCreate}
          isProcessing={isCreating}
        />
      </View>
    </View>
  );
}
