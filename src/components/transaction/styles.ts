import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 7,
    height: 72,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },

  info: {
    gap: 7,
    flex: 1,
  },

  value: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },

  description: {
    fontSize: 12,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
});
