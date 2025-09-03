import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function AsylumAppeals() {
  const { t } = useTranslation("asylumAppeals");
  const router = useRouter();

  // Tiles (subsections)
  const tiles = [
    {
      key: "deadlines",
      icon: <MaterialIcons name="event" size={24} color="#EF4444" />,
      title: t("tiles.deadlines_title"),
      sub: t("tiles.deadlines_sub"),
      onPress: () => router.push("/information/asylum/appeals/deadlines"),
    },
    {
      key: "guide",
      icon: <MaterialIcons name="menu-book" size={24} color="#3B82F6" />,
      title: t("tiles.guide_title"),
      sub: t("tiles.guide_sub"),
      onPress: () => router.push("/information/asylum/appeals/guide"),
    },
    {
      key: "templates",
      icon: <MaterialIcons name="description" size={24} color="#10B981" />,
      title: t("tiles.templates_title"),
      sub: t("tiles.templates_sub"),
      onPress: () => router.push("/information/asylum/appeals/templates"),
    },
    {
      key: "contacts",
      icon: <MaterialIcons name="support-agent" size={24} color="#F59E0B" />,
      title: t("tiles.contacts_title"),
      sub: t("tiles.contacts_sub"),
      onPress: () => router.push("/information/asylum/appeals/contacts"),
    },
  ];

  // Trusted contacts (inline for quick help)
  const contacts = [
    {
      name: t("trusted.lawyer_service"),
      phone: t("trusted.lawyer_phone"),
      url: t("trusted.lawyer_url"),
      subtitle: t("trusted.lawyer_sub"),
    },
    {
      name: t("trusted.ngo_legal"),
      phone: t("trusted.ngo_phone"),
      url: t("trusted.ngo_url"),
      subtitle: t("trusted.ngo_sub"),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="asylumAppeals"
      videoId={t("exampleVideoId", { defaultValue: "abcd1234" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/information/contacts"
    />
  );
}
