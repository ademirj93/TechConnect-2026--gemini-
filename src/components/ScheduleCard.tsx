import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScheduleItem } from "../types";
import { COLORS, SPACING } from "../constants/theme";

interface ScheduleCardProps {
  item: ScheduleItem;
  index: number;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <View
      style={[
        styles.card,
        isEven ? styles.borderAccentBlue : styles.borderAccentPurple,
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.timeBadge,
            isEven ? styles.timeBadgeBlue : styles.timeBadgePurple,
          ]}
        >
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.trackText}>{item.track}</Text>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 6,
    shadowColor: COLORS.primaryBlueDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    height: "100%",
    justifyContent: "space-between",
  },
  borderAccentBlue: {
    borderLeftColor: COLORS.primaryBlue,
  },
  borderAccentPurple: {
    borderLeftColor: COLORS.primaryPurple,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  timeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  timeBadgeBlue: {
    backgroundColor: COLORS.primaryBlue,
  },
  timeBadgePurple: {
    backgroundColor: COLORS.primaryPurple,
  },
  timeText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  trackText: {
    color: COLORS.primaryPurple,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    lineHeight: 28,
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 23,
  },
});
