import {
  FlatList,
  FlatListProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import { Separator } from "../separator";
import { colors } from "@/theme/colors";

type Props<T> = FlatListProps<T> & {
  title: string;
  emptyMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function List<T>({
  title,
  emptyMessage,
  containerStyle,
  data,
  renderItem,
  ...rest
}: Props<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>{emptyMessage}</Text>
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
        {...rest}
      />
    </View>
  );
}
