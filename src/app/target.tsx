import { View } from "react-native";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { PageHeader } from "@/components/page-header";
import { CurrencyInput } from "@/components/currency-input";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira."
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
        />

        <CurrencyInput label="Valor alvo" value={0} />

        <Button title="Salvar" />
      </View>
    </View>
  );
}
