import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 42,
    width: "100%",
    flexDirection: "row",

    borderRadius: 8,
    overflow: "hidden",
  },

  option: {
    gap: 7,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.gray[100],

    borderRadius: 8,
  },

  title: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
  },
});
