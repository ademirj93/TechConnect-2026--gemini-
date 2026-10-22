import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  PressableStateCallbackType,
} from "react-native";
import { COLORS } from "../constants/theme";

interface InteractiveButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "light";
  fullWidth?: boolean;
  style?: ViewStyle;
}

type WebPressableState = PressableStateCallbackType & {
  hovered?: boolean;
};

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  fullWidth = false,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={(state: WebPressableState) => {
        const isHovered = Boolean(state.hovered);
        const isPressed = state.pressed;

        return [
          styles.baseButton,
          fullWidth && styles.fullWidth,
          variant === "primary" && styles.primaryButton,
          variant === "secondary" && styles.secondaryButton,
          variant === "light" && styles.lightButton,
          isHovered && variant === "primary" && styles.primaryHovered,
          isHovered && variant === "secondary" && styles.secondaryHovered,
          isHovered && variant === "light" && styles.lightHovered,
          isPressed && styles.pressed,
          style,
        ];
      }}
    >
      <Text
        style={[
          styles.baseText,
          variant === "light"
            ? styles.lightButtonText
            : styles.defaultButtonText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  fullWidth: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: COLORS.primaryPurple,
    borderColor: COLORS.primaryPurpleLight,
    shadowColor: COLORS.primaryPurpleDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryHovered: {
    backgroundColor: COLORS.primaryBlue,
    borderColor: COLORS.primaryBlueLight,
    transform: [{ translateY: -2 }],
  },
  secondaryButton: {
    backgroundColor: COLORS.primaryBlue,
    borderColor: COLORS.primaryBlueLight,
  },
  secondaryHovered: {
    backgroundColor: COLORS.primaryPurple,
    borderColor: COLORS.primaryPurpleLight,
    transform: [{ translateY: -2 }],
  },
  lightButton: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  lightHovered: {
    backgroundColor: COLORS.blueSurface,
    borderColor: COLORS.primaryBlueLight,
    transform: [{ translateY: -2 }],
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  baseText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  defaultButtonText: {
    color: COLORS.white,
  },
  lightButtonText: {
    color: COLORS.primaryPurpleDark,
  },
});
