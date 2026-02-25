import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme/colors";

type Props = TouchableOpacityProps & {
  title: string;
  isProcessing?: boolean;
};

export function Button({ title, isProcessing = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={isProcessing}
      style={styles.container}
      {...rest}
    >
      <Text style={styles.title}>
        {isProcessing ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}
