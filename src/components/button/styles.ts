import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 48,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue[500],
  },

  title: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
});
