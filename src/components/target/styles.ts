import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
    height: 72,
    width: "100%",
    paddingBottom: 16,
    alignItems: "center",
    flexDirection: "row",
  },

  content: {
    gap: 7,
    flex: 1,
  },

  name: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },

  status: {
    fontSize: 10,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
});
