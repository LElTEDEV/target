import { MaterialIcons } from "@expo/vector-icons";
import { ColorValue, Text, View } from "react-native";

import { styles } from "./styles";

export type SummaryProps = {
  label: string;
  value: string;
};

type Props = {
  data: SummaryProps;
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  isLeft?: boolean;
  visible: boolean;
};

export function Summary({ data, icon, isLeft = false, visible }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isLeft && { justifyContent: "flex-end" }]}>
        <MaterialIcons name={icon.name} size={16} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{visible ? data.value : "*****"}</Text>
    </View>
  );
}
