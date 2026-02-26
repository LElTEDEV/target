import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { PageHeader } from "@/components/page-header";
import { CurrencyInput } from "@/components/currency-input";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { TransactionType } from "@/components/transaction-type";
import { TransactionTypes } from "@/utils/transaction-types";
import { useState } from "react";

export default function Transactions() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [type, setType] = useState(TransactionTypes.Input);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evite retirar."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput label="Valor (R$)" value={0} />

        <Input
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
        />

        <Button title="Salvar" />
      </View>
    </View>
  );
}
