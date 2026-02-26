import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

import { Separator } from "../separator";
import { Summary, SummaryProps } from "../summary";

import { colors } from "@/theme/colors";
import { styles } from "./styles";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export type HomeHeaderProps = {
  total: string;
  input: SummaryProps;
  output: SummaryProps;
};

type Props = {
  data: HomeHeaderProps;
};

export function HomeHeader({ data }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blue[500], colors.blue[800]]}
    >
      <View style={styles.total_container}>
        <View>
          <Text style={styles.label}>Total que você possui</Text>
          <Text style={styles.total}>{visible ? data.total : "****"}</Text>
        </View>

        <TouchableOpacity onPress={() => setVisible(!visible)}>
          {visible ? (
            <MaterialIcons
              size={24}
              name="visibility"
              color={colors.gray[400]}
            />
          ) : (
            <MaterialIcons
              size={24}
              name="visibility-off"
              color={colors.gray[400]}
            />
          )}
        </TouchableOpacity>
      </View>

      <Separator color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          data={data.input}
          icon={{ name: "arrow-upward", color: colors.green[500] }}
          visible={visible}
        />

        <Summary
          data={data.output}
          icon={{ name: "arrow-downward", color: colors.red[400] }}
          isRight
          visible={visible}
        />
      </View>
    </LinearGradient>
  );
}
