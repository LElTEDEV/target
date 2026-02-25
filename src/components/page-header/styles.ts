import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 32,
  },

  header: {
    marginBottom: 32,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 24,
    marginBottom: 7,
    color: colors.black,
    fontFamily: fontFamily.bold,
  },

  subtitle: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.regular,
  },
});
