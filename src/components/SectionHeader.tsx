import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  lightMode?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  lightMode = false,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.badgeContainer,
          lightMode ? styles.badgeLight : styles.badgeDefault,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            lightMode ? styles.badgeTextLight : styles.badgeTextDefault,
          ]}
        >
          {badge.toUpperCase()}
        </Text>
      </View>
      <Text
        style={[
          styles.title,
          lightMode ? styles.titleLight : styles.titleDefault,
        ]}
      >
        {title}
      </Text>
      <View style={styles.divider} />
      {subtitle ? (
        <Text
          style={[
            styles.subtitle,
            lightMode ? styles.subtitleLight : styles.subtitleDefault,
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: SPACING.xxl,
    paddingHorizontal: SPACING.md,
  },
  badgeContainer: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: SPACING.sm,
    borderWidth: 1,
  },
  badgeDefault: {
    backgroundColor: COLORS.purpleSurface,
    borderColor: COLORS.primaryPurpleLight,
  },
  badgeLight: {
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.1,
  },
  badgeTextDefault: {
    color: COLORS.primaryPurple,
  },
  badgeTextLight: {
    color: COLORS.white,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  titleDefault: {
    color: COLORS.textPrimary,
  },
  titleLight: {
    color: COLORS.white,
  },
  divider: {
    width: 64,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primaryBlue,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 680,
  },
  subtitleDefault: {
    color: COLORS.textSecondary,
  },
  subtitleLight: {
    color: COLORS.blueSurface,
  },
});
