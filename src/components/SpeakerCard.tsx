import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Speaker } from "../types";
import { COLORS, SPACING } from "../constants/theme";

interface SpeakerCardProps {
  speaker: Speaker;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
  const isBlue = speaker.accentColor === "blue";

  return (
    <View style={styles.card}>
      {/* Representação Visual Nativa (Ilustração Geométrica + Monograma, sem APIs externas) */}
      <View style={styles.avatarWrapper}>
        <View
          style={[
            styles.avatarOuterRing,
            isBlue ? styles.ringBlue : styles.ringPurple,
          ]}
        >
          <View
            style={[
              styles.avatarCanvas,
              isBlue ? styles.canvasBlue : styles.canvasPurple,
            ]}
          >
            {/* Silhueta estilizada ao fundo do avatar */}
            <View style={styles.silhouetteHead} />
            <View style={styles.silhouetteShoulders} />

            {/* Selo central com iniciais */}
            <View style={styles.initialsBadge}>
              <Text style={styles.initialsText}>{speaker.initials}</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.statusIndicator,
            isBlue ? styles.indicatorBlue : styles.indicatorPurple,
          ]}
        >
          <Text style={styles.statusIndicatorText}>KEYNOTE</Text>
        </View>
      </View>

      <Text style={styles.name}>{speaker.name}</Text>
      <Text
        style={[
          styles.specialty,
          isBlue ? styles.specialtyBlue : styles.specialtyPurple,
        ]}
      >
        {speaker.specialty}
      </Text>
      <View style={styles.separator} />
      <Text style={styles.role}>{speaker.role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primaryPurpleDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 3,
    height: "100%",
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: SPACING.md,
    position: "relative",
  },
  avatarOuterRing: {
    width: 116,
    height: 116,
    borderRadius: 58,
    padding: 5,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  ringBlue: {
    borderColor: COLORS.primaryBlueLight,
    backgroundColor: COLORS.blueSurface,
  },
  ringPurple: {
    borderColor: COLORS.primaryPurpleLight,
    backgroundColor: COLORS.purpleSurface,
  },
  avatarCanvas: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  canvasBlue: {
    backgroundColor: COLORS.primaryBlueDark,
  },
  canvasPurple: {
    backgroundColor: COLORS.primaryPurpleDark,
  },
  silhouetteHead: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    position: "absolute",
    top: 16,
  },
  silhouetteShoulders: {
    width: 76,
    height: 48,
    borderRadius: 38,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    position: "absolute",
    bottom: -14,
  },
  initialsBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    borderWidth: 1.5,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1,
  },
  statusIndicator: {
    marginTop: -12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  indicatorBlue: {
    backgroundColor: COLORS.primaryBlue,
  },
  indicatorPurple: {
    backgroundColor: COLORS.primaryPurple,
  },
  statusIndicatorText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  name: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 6,
  },
  specialty: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  specialtyBlue: {
    color: COLORS.primaryBlue,
  },
  specialtyPurple: {
    color: COLORS.primaryPurple,
  },
  separator: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  role: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 19,
  },
});
