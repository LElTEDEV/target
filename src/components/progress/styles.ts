import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    fontSize: 12,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,

    marginBottom: 5,
  },

  status: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  value: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.medium,

    flex: 1,
  },

  target: {
    fontSize: 14,
    color: colors.gray[500],
    fontFamily: fontFamily.medium,
  },

  percentage: {
    fontSize: 14,
    color: colors.blue[500],
    fontFamily: fontFamily.bold,
  },

  progress: {
    height: 5,
    width: "100%",
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: colors.gray[300],
    overflow: "hidden",
  },

  current_progress: {
    height: 5,
    backgroundColor: colors.blue[500],
  },
});
