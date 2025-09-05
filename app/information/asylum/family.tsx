// app/information/asylum/reunification.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function ReunificationPage() {
  const { t } = useTranslation("asylumReunification");
  const router = useRouter();

  const tiles = [
    {
      key: "guide",
      icon: <MaterialIcons name="info" size={24} color="#3B82F6" />,
      title: t("tiles.guide_title", { defaultValue: "Step-by-step Guide" }),
      sub: t("tiles.guide_sub", { defaultValue: "Understand the reunification process" }),
      onPress: () => router.push("/information/asylum/reunification-guide"),
    },
    {
      key: "documents",
      icon: <MaterialIcons name="folder" size={24} color="#10B981" />,
      title: t("tiles.documents_title", { defaultValue: "Documents Needed" }),
      sub: t("tiles.documents_sub", { defaultValue: "Birth, marriage, IDs, custody papers" }),
      onPress: () => router.push("/information/asylum/reunification-documents"),
    },
    {
      key: "child_protection",
      icon: <MaterialIcons name="child-care" size={24} color="#F59E0B" />,
      title: t("tiles.child_protection_title", { defaultValue: "Child Protection" }),
      sub: t("tiles.child_protection_sub", { defaultValue: "Special rights for children and minors" }),
      onPress: () => router.push("/information/asylum/reunification-children"),
    },
    {
      key: "checklist",
      icon: <MaterialIcons name="checklist" size={24} color="#EF4444" />,
      title: t("tiles.checklist_title", { defaultValue: "My Checklist" }),
      sub: t("tiles.checklist_sub", { defaultValue: "Generate a personalized checklist" }),
      onPress: () => router.push("/information/asylum/reunification-checklist"),
    },
    {
      key: "ngo_support",
      icon: <MaterialIcons name="groups" size={24} color="#8B5CF6" />,
      title: t("tiles.ngo_support_title", { defaultValue: "NGO Support" }),
      sub: t("tiles.ngo_support_sub", { defaultValue: "Who can help me apply?" }),
      onPress: () => router.push("/information/asylum/reunification-contacts"),
    }
  ];

  const contacts = [
    {
      name: t("contacts.redCross", { defaultValue: "Red Cross Family Tracing Service" }),
      phone: t("contacts.redCross_phone", { defaultValue: "0800 111 222" }),
      url: t("contacts.redCross_url", { defaultValue: "https://familylinks.icrc.org" }),
      subtitle: t("contacts.redCross_sub", { defaultValue: "Helps reconnect families across borders" }),
    },
    {
      name: t("contacts.caritas", { defaultValue: "Caritas Family Support" }),
      phone: t("contacts.caritas_phone", { defaultValue: "0800 333 444" }),
      url: t("contacts.caritas_url", { defaultValue: "https://www.caritas.at" }),
      subtitle: t("contacts.caritas_sub", { defaultValue: "Legal advice and help with applications" }),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="asylumReunification"
      videoId={t("videoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/information/contacts"
    />
  );
}
