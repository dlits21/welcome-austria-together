import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function AsylumLegalPage() {
  const { t } = useTranslation("asylumLegal");
  const router = useRouter();

  // Tiles for different status types
  const tiles = [
    {
      key: "quiz",
      icon: "❓",
      title: t("tiles.quiz_title", { defaultValue: "What is my type?" }),
      sub: t("tiles.quiz_sub", { defaultValue: "Find out your legal status" }),
      onPress: () => router.push("/information/asylum/legal/quiz"),
    },
    {
      key: "refugee",
      icon: "🛡️",
      title: t("status.refugee.title", { defaultValue: "Refugee" }),
      sub: t("status.refugee.desc", { defaultValue: "Full protection & rights" }),
      onPress: () => router.push("/information/asylum/legal/refugee"),
    },
    {
      key: "subsidiary",
      icon: "📜",
      title: t("status.subsidiary.title", { defaultValue: "Subsidiary protection" }),
      sub: t("status.subsidiary.desc", { defaultValue: "Temporary, limited rights" }),
      onPress: () => router.push("/information/asylum/legal/subsidiary"),
    },
    {
      key: "dublin",
      icon: "🇪🇺",
      title: t("status.dublin.title", { defaultValue: "Dublin" }),
      sub: t("status.dublin.desc", { defaultValue: "May be transferred to another EU country" }),
      onPress: () => router.push("/information/asylum/legal/dublin"),
    },
    {
      key: "rejected",
      icon: "❌",
      title: t("status.rejected.title", { defaultValue: "Rejected" }),
      sub: t("status.rejected.desc", { defaultValue: "Denied — you must act fast" }),
      onPress: () => router.push("/information/asylum/legal/rejected"),
    },
  ];

  // Contacts: NGOs / legal hotlines
  const contacts = [
    {
      name: t("trusted.refugee_council", { defaultValue: "Refugee Council" }),
      phone: t("trusted.refugee_phone", { defaultValue: "+43 123 456 789" }),
      url: t("trusted.refugee_url", { defaultValue: "https://refugee-council.example.org" }),
      subtitle: t("trusted.refugee_sub", { defaultValue: "Free legal advice & caseworkers" }),
    },
    {
      name: t("trusted.legal_aid", { defaultValue: "Legal Aid Austria" }),
      phone: t("trusted.legal_phone", { defaultValue: "+43 987 654 321" }),
      subtitle: t("trusted.legal_sub", { defaultValue: "Help with asylum procedures & appeals" }),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="asylumLegal"
      videoId={t("videoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/ask/emergency"
    />
  );
}
