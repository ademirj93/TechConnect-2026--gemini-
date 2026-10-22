import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  useWindowDimensions,
  LayoutChangeEvent,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING } from "./src/constants/theme";
import {
  EVENT_INFO,
  SCHEDULE_DATA,
  SPEAKERS_DATA,
} from "./src/constants/mockData";
import {
  DeviceType,
  RegistrationFormData,
  RegistrationFormErrors,
} from "./src/types";
import { InteractiveButton } from "./src/components/InteractiveButton";
import { SectionHeader } from "./src/components/SectionHeader";
import { ScheduleCard } from "./src/components/ScheduleCard";
import { SpeakerCard } from "./src/components/SpeakerCard";

export default function App() {
  const { width, height } = useWindowDimensions();

  // Classificação responsiva de dispositivo (RF07)
  const deviceType: DeviceType =
    width < 768 ? "mobile" : width < 1080 ? "tablet" : "desktop";
  const isMobile = deviceType === "mobile";
  const isDesktop = deviceType === "desktop";

  // Referência para rolagem vertical suave até a seção de inscrição (RF02 e RF03)
  const scrollViewRef = useRef<ScrollView>(null);
  const [registrationSectionY, setRegistrationSectionY] = useState<number>(0);

  // Estados do formulário de inscrição (RF05 e RF06)
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    courseOrArea: "",
  });
  const [formErrors, setFormErrors] = useState<RegistrationFormErrors>({});
  const [submittedData, setSubmittedData] =
    useState<RegistrationFormData | null>(null);

  const handleRegistrationLayout = (event: LayoutChangeEvent) => {
    setRegistrationSectionY(event.nativeEvent.layout.y);
  };

  const scrollToRegistration = () => {
    scrollViewRef.current?.scrollTo({
      y: registrationSectionY,
      animated: true,
    });
  };

  const validateForm = (): boolean => {
    const errors: RegistrationFormErrors = {};
    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedCourse = formData.courseOrArea.trim();

    if (!trimmedName) {
      errors.fullName = "O preenchimento do nome completo é obrigatório.";
    } else if (trimmedName.length < 3) {
      errors.fullName = "Informe um nome válido com pelo menos 3 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errors.email = "O preenchimento do e-mail é obrigatório.";
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email =
        "Informe um endereço de e-mail em formato válido (ex: nome@dominio.com).";
    }

    if (!trimmedCourse) {
      errors.courseOrArea =
        "Informe seu curso ou área de atuação profissional.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      setSubmittedData({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        courseOrArea: formData.courseOrArea.trim(),
      });
      setFormData({ fullName: "", email: "", courseOrArea: "" });
      setFormErrors({});
    }
  };

  const handleInputChange = (
    field: keyof RegistrationFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submittedData) {
      setSubmittedData(null);
    }
  };

  return (
    <View style={[styles.safeArea, { minHeight: height }]}>
      <StatusBar style="light" />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* =====================================================================
            SEÇÃO 1 — CABEÇALHO E BANNER PRINCIPAL
        ===================================================================== */}
        <View style={styles.heroWrapper}>
          {/* Elementos geométricos decorativos (em azul e roxo) */}
          <View style={styles.decorativeCirclePurple} />
          <View style={styles.decorativeCircleBlue} />

          {/* Barra superior do cabeçalho */}
          <View style={styles.topNavbar}>
            <View style={styles.brandContainer}>
              <View style={styles.brandLogoMark}>
                <Text style={styles.brandLogoText}>TC</Text>
              </View>
              <Text style={styles.brandTitle}>{EVENT_INFO.name}</Text>
            </View>

            {!isMobile && (
              <InteractiveButton
                label="Inscreva-se"
                onPress={scrollToRegistration}
                variant="primary"
              />
            )}
          </View>

          {/* Conteúdo do Banner Principal */}
          <View
            style={[
              styles.heroContentContainer,
              isMobile ? styles.heroPaddingMobile : styles.heroPaddingDesktop,
            ]}
          >
            <View style={styles.editionPill}>
              <Text style={styles.editionPillText}>
                EDIÇÃO OFICIAL • TECNOLOGIA, INOVAÇÃO & IA
              </Text>
            </View>

            <Text
              style={[
                styles.heroTitle,
                isMobile ? styles.heroTitleMobile : styles.heroTitleDesktop,
              ]}
            >
              {EVENT_INFO.name}
            </Text>

            <Text
              style={[
                styles.heroSlogan,
                isMobile ? styles.heroSloganMobile : styles.heroSloganDesktop,
              ]}
            >
              "{EVENT_INFO.slogan}"
            </Text>

            {/* Cartões de Data e Local */}
            <View
              style={[
                styles.eventMetaContainer,
                isMobile ? styles.metaColumn : styles.metaRow,
              ]}
            >
              <View style={styles.metaBadge}>
                <View style={styles.metaDotBlue} />
                <View>
                  <Text style={styles.metaLabel}>DATA DO EVENTO</Text>
                  <Text style={styles.metaValue}>{EVENT_INFO.date}</Text>
                </View>
              </View>

              <View style={styles.metaBadge}>
                <View style={styles.metaDotPurple} />
                <View>
                  <Text style={styles.metaLabel}>LOCALIZAÇÃO</Text>
                  <Text style={styles.metaValue}>{EVENT_INFO.location}</Text>
                </View>
              </View>
            </View>

            <View style={styles.heroCtaWrapper}>
              <InteractiveButton
                label="Inscreva-se"
                onPress={scrollToRegistration}
                variant="light"
                fullWidth={isMobile}
              />
            </View>
          </View>
        </View>

        {/* =====================================================================
            SEÇÃO 2 — SOBRE O EVENTO
        ===================================================================== */}
        <View style={styles.sectionLight}>
          <View style={styles.container}>
            <SectionHeader
              badge="Sobre o Evento"
              title="Conhecimento e Inovação na Fronteira Digital"
              subtitle="Um encontro desenhado para conectar mentes inquietas às tecnologias que estão remodelando o mundo."
            />

            <View
              style={[
                styles.aboutLayout,
                isDesktop ? styles.aboutLayoutRow : styles.aboutLayoutColumn,
              ]}
            >
              <View style={styles.aboutTextColumn}>
                {EVENT_INFO.aboutParagraphs.map((paragraph, idx) => (
                  <Text key={idx} style={styles.aboutParagraph}>
                    {paragraph}
                  </Text>
                ))}
              </View>

              <View style={styles.aboutHighlightsColumn}>
                <View style={styles.aboutFeatureBox}>
                  <Text style={styles.aboutFeatureTitle}>
                    Pilares do TechConnect 2026
                  </Text>
                  {EVENT_INFO.highlights.map((item, idx) => (
                    <View key={idx} style={styles.highlightRow}>
                      <View style={styles.highlightBullet} />
                      <View style={styles.highlightTextGroup}>
                        <Text style={styles.highlightLabel}>{item.label}</Text>
                        <Text style={styles.highlightValue}>{item.value}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* =====================================================================
            SEÇÃO 3 — PROGRAMAÇÃO
        ===================================================================== */}
        <View style={styles.sectionMuted}>
          <View style={styles.container}>
            <SectionHeader
              badge="Agenda Oficial"
              title="Programação do Evento"
              subtitle="Confira as quatro atividades principais planejadas para o dia 20 de novembro de 2026."
            />

            <View style={styles.gridContainer}>
              {SCHEDULE_DATA.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.gridItem,
                    isMobile ? styles.col100 : styles.col50,
                  ]}
                >
                  <ScheduleCard item={item} index={index} />
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* =====================================================================
            SEÇÃO 4 — PALESTRANTES
        ===================================================================== */}
        <View style={styles.sectionLight}>
          <View style={styles.container}>
            <SectionHeader
              badge="Especialistas Confirmados"
              title="Palestrantes"
              subtitle="Conheça as referências em Inteligência Artificial, Engenharia de Software e Inovação que estarão no palco."
            />

            <View style={styles.gridContainer}>
              {SPEAKERS_DATA.map((speaker) => (
                <View
                  key={speaker.id}
                  style={[
                    styles.gridItem,
                    isMobile
                      ? styles.col100
                      : isDesktop
                        ? styles.col25
                        : styles.col50,
                  ]}
                >
                  <SpeakerCard speaker={speaker} />
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* =====================================================================
            SEÇÃO 5 — INSCRIÇÃO
        ===================================================================== */}
        <View
          onLayout={handleRegistrationLayout}
          style={styles.sectionRegistration}
        >
          <View style={styles.container}>
            <SectionHeader
              badge="Garanta sua Participação"
              title="Inscrição no TechConnect 2026"
              subtitle="Preencha os dados abaixo para realizar sua inscrição demonstrativa gratuita no evento."
              lightMode={true}
            />

            <View style={styles.formCard}>
              {/* Campo: Nome Completo */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome completo *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    formErrors.fullName ? styles.textInputError : null,
                  ]}
                  placeholder="Ex.: Mariana Ferreira Costa"
                  placeholderTextColor={COLORS.textMuted}
                  value={formData.fullName}
                  onChangeText={(value) => handleInputChange("fullName", value)}
                  accessibilityLabel="Nome completo"
                />
                {formErrors.fullName ? (
                  <Text style={styles.errorText}>{formErrors.fullName}</Text>
                ) : null}
              </View>

              {/* Campo: E-mail */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>E-mail *</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    formErrors.email ? styles.textInputError : null,
                  ]}
                  placeholder="Ex.: mariana.costa@email.com.br"
                  placeholderTextColor={COLORS.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  accessibilityLabel="E-mail"
                />
                {formErrors.email ? (
                  <Text style={styles.errorText}>{formErrors.email}</Text>
                ) : null}
              </View>

              {/* Campo: Curso ou Área de Atuação */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  Curso ou área de atuação *
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    formErrors.courseOrArea ? styles.textInputError : null,
                  ]}
                  placeholder="Ex.: Análise e Desenvolvimento de Sistemas / Engenharia de Software"
                  placeholderTextColor={COLORS.textMuted}
                  value={formData.courseOrArea}
                  onChangeText={(value) =>
                    handleInputChange("courseOrArea", value)
                  }
                  accessibilityLabel="Curso ou área de atuação"
                />
                {formErrors.courseOrArea ? (
                  <Text style={styles.errorText}>
                    {formErrors.courseOrArea}
                  </Text>
                ) : null}
              </View>

              <InteractiveButton
                label="Realizar inscrição"
                onPress={handleFormSubmit}
                variant="primary"
                fullWidth={true}
                style={styles.submitButtonSpacing}
              />

              {/* Mensagem de Confirmação Demonstrativa (RF06) */}
              {submittedData ? (
                <View style={styles.confirmationBox}>
                  <View style={styles.confirmationBadge}>
                    <Text style={styles.confirmationBadgeText}>
                      INSCRIÇÃO CONFIRMADA
                    </Text>
                  </View>
                  <Text style={styles.confirmationTitle}>
                    Parabéns, {submittedData.fullName}!
                  </Text>
                  <Text style={styles.confirmationDescription}>
                    Sua inscrição demonstrativa para o{" "}
                    <Text style={styles.boldText}>{EVENT_INFO.name}</Text> foi
                    validada com sucesso. Um comprovante simbólico está
                    associado ao e-mail{" "}
                    <Text style={styles.boldText}>{submittedData.email}</Text>{" "}
                    (Área/Curso:{" "}
                    <Text style={styles.boldText}>
                      {submittedData.courseOrArea}
                    </Text>
                    ).
                  </Text>
                  <Text style={styles.confirmationFootnote}>
                    * Nota: Esta é uma confirmação demonstrativa em memória, sem
                    persistência em banco de dados.
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {/* =====================================================================
            SEÇÃO 6 — RODAPÉ
        ===================================================================== */}
        <View style={styles.footer}>
          <View style={styles.container}>
            <View
              style={[
                styles.footerContent,
                isMobile ? styles.footerColumn : styles.footerRow,
              ]}
            >
              <View style={styles.footerBrandCol}>
                <Text style={styles.footerBrandTitle}>{EVENT_INFO.name}</Text>
                <Text style={styles.footerSlogan}>{EVENT_INFO.slogan}</Text>
                <Text style={styles.footerLocation}>
                  {EVENT_INFO.location} — {EVENT_INFO.date}
                </Text>
              </View>

              <View style={styles.footerContactCol}>
                <Text style={styles.footerSectionHeading}>
                  Contato e Atendimento (Fictício)
                </Text>
                <Text style={styles.footerContactItem}>
                  E-mail: contato@techconnect2026.com.br
                </Text>
                <Text style={styles.footerContactItem}>
                  Imprensa & Parcerias: imprensa@techconnect2026.com.br
                </Text>
                <Text style={styles.footerContactItem}>
                  Telefone: +55 (11) 4002-8922
                </Text>
                <Text style={styles.footerContactItem}>
                  Endereço: Av. da Inovação Tecnológica, 2026 — Distrito Digital
                </Text>
              </View>
            </View>

            <View style={styles.footerDivider} />

            <Text style={styles.copyrightText}>
              © 2026 {EVENT_INFO.name}. Todos os direitos reservados. Hotsite
              desenvolvido com React Native, TypeScript e Expo Web.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryBlueDark,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    maxWidth: SPACING.maxContainerWidth,
    alignSelf: "center",
    paddingHorizontal: SPACING.lg,
  },

  // --- Seção 1: Cabeçalho e Banner Principal ---
  heroWrapper: {
    backgroundColor: COLORS.primaryBlueDark,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primaryPurpleLight,
    position: "relative",
    overflow: "hidden",
  },
  decorativeCirclePurple: {
    position: "absolute",
    width: 480,
    height: 480,
    borderRadius: 240,
    backgroundColor: COLORS.primaryPurple,
    opacity: 0.35,
    top: -140,
    right: -120,
  },
  decorativeCircleBlue: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: COLORS.primaryBlue,
    opacity: 0.3,
    bottom: -120,
    left: -100,
  },
  topNavbar: {
    width: "100%",
    maxWidth: SPACING.maxContainerWidth,
    alignSelf: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brandLogoMark: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primaryPurple,
    borderWidth: 1.5,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  brandLogoText: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  brandTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  heroContentContainer: {
    width: "100%",
    maxWidth: 920,
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  heroPaddingDesktop: {
    paddingVertical: 88,
  },
  heroPaddingMobile: {
    paddingVertical: 52,
  },
  editionPill: {
    backgroundColor: "rgba(109, 40, 217, 0.55)",
    borderWidth: 1,
    borderColor: COLORS.primaryPurpleLight,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 24,
    marginBottom: SPACING.lg,
  },
  editionPillText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.1,
    textAlign: "center",
  },
  heroTitle: {
    color: COLORS.white,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: SPACING.md,
  },
  heroTitleDesktop: {
    fontSize: 56,
    lineHeight: 64,
  },
  heroTitleMobile: {
    fontSize: 36,
    lineHeight: 42,
  },
  heroSlogan: {
    color: COLORS.blueSurface,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: SPACING.xl,
  },
  heroSloganDesktop: {
    fontSize: 24,
    lineHeight: 34,
  },
  heroSloganMobile: {
    fontSize: 18,
    lineHeight: 26,
  },
  eventMetaContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
    width: "100%",
    justifyContent: "center",
  },
  metaRow: {
    flexDirection: "row",
  },
  metaColumn: {
    flexDirection: "column",
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 12,
  },
  metaDotBlue: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primaryBlueLight,
  },
  metaDotPurple: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primaryPurpleLight,
  },
  metaLabel: {
    color: COLORS.blueSurface,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.9,
    marginBottom: 2,
  },
  metaValue: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },
  heroCtaWrapper: {
    width: "100%",
    maxWidth: 280,
    alignItems: "center",
  },

  // --- Seções Padrão ---
  sectionLight: {
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.sectionVertical,
  },
  sectionMuted: {
    backgroundColor: COLORS.backgroundLight,
    paddingVertical: SPACING.sectionVertical,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },

  // --- Seção 2: Sobre o Evento ---
  aboutLayout: {
    gap: SPACING.xl,
    alignItems: "center",
  },
  aboutLayoutRow: {
    flexDirection: "row",
  },
  aboutLayoutColumn: {
    flexDirection: "column",
  },
  aboutTextColumn: {
    flex: 1.3,
    gap: SPACING.md,
  },
  aboutParagraph: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.textSecondary,
  },
  aboutHighlightsColumn: {
    flex: 1,
    width: "100%",
  },
  aboutFeatureBox: {
    backgroundColor: COLORS.purpleSurface,
    borderRadius: 16,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.primaryPurpleLight,
  },
  aboutFeatureTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primaryPurpleDark,
    marginBottom: SPACING.lg,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
    gap: 12,
  },
  highlightBullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primaryBlue,
  },
  highlightTextGroup: {
    flex: 1,
  },
  highlightLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primaryPurple,
    textTransform: "uppercase",
  },
  highlightValue: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },

  // --- Sistema de Grid Responsivo (Seções 3 e 4) ---
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -SPACING.sm,
    rowGap: SPACING.md,
  },
  gridItem: {
    paddingHorizontal: SPACING.sm,
  },
  col100: {
    width: "100%",
  },
  col50: {
    width: "50%",
  },
  col25: {
    width: "25%",
  },

  // --- Seção 5: Inscrição ---
  sectionRegistration: {
    backgroundColor: COLORS.primaryPurpleDark,
    paddingVertical: SPACING.sectionVertical,
    borderTopWidth: 4,
    borderTopColor: COLORS.primaryBlue,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: SPACING.xl,
    maxWidth: 640,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.backgroundLight,
  },
  textInputError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorBg,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
  },
  submitButtonSpacing: {
    marginTop: SPACING.sm,
  },
  confirmationBox: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.successBg,
    borderWidth: 1.5,
    borderColor: COLORS.primaryBlueLight,
    borderRadius: 12,
    padding: SPACING.lg,
  },
  confirmationBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: SPACING.sm,
  },
  confirmationBadgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primaryBlueDark,
    marginBottom: 6,
  },
  confirmationDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "800",
    color: COLORS.primaryPurpleDark,
  },
  confirmationFootnote: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },

  // --- Seção 6: Rodapé ---
  footer: {
    backgroundColor: COLORS.primaryBlueDark,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
  },
  footerContent: {
    justifyContent: "space-between",
    gap: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  footerRow: {
    flexDirection: "row",
  },
  footerColumn: {
    flexDirection: "column",
  },
  footerBrandCol: {
    flex: 1,
  },
  footerBrandTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 6,
  },
  footerSlogan: {
    color: COLORS.blueSurface,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  footerLocation: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  footerContactCol: {
    flex: 1,
  },
  footerSectionHeading: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
  footerContactItem: {
    color: COLORS.blueSurface,
    fontSize: 14,
    lineHeight: 22,
  },
  footerDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    marginBottom: SPACING.lg,
  },
  copyrightText: {
    color: COLORS.blueSurface,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
});
