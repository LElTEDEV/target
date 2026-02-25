import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
  },

  label: {
    fontSize: 12,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
  },

  input: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.regular,

    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400],
  },
});
