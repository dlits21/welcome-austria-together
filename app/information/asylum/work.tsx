import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function WorkPermitsPage() {
  const { t } = useTranslation("asylumWorkPermits");
  const router = useRouter();

  const tiles = [
    {
      key: "can_i_work",
      icon: <MaterialIcons name="work" size={24} color="#3B82F6" />,
      title: t("tiles.can_i_work_title"),
      sub: t("tiles.can_i_work_sub"),
      onPress: () => router.push("/information/asylum/work-permits-can-i-work"),
    },
    {
      key: "apply_permit",
      icon: <MaterialIcons name="assignment" size={24} color="#10B981" />,
      title: t("tiles.apply_permit_title"),
      sub: t("tiles.apply_permit_sub"),
      onPress: () => router.push("/information/asylum/work-permits-apply"),
    },
    {
      key: "rights",
      icon: <MaterialIcons name="gavel" size={24} color="#F59E0B" />,
      title: t("tiles.rights_title"),
      sub: t("tiles.rights_sub"),
      onPress: () => router.push("/information/asylum/work-permits-rights"),
    },
    {
      key: "unsafe",
      icon: <MaterialIcons name="report-problem" size={24} color="#EF4444" />,
      title: t("tiles.unsafe_title"),
      sub: t("tiles.unsafe_sub"),
      onPress: () => router.push("/information/asylum/work-permits-unsafe"),
    },
    {
      key: "report",
      icon: <MaterialIcons name="support-agent" size={24} color="#8B5CF6" />,
      title: t("tiles.report_title"),
      sub: t("tiles.report_sub"),
      onPress: () => router.push("/information/asylum/work-permits-report"),
    },
    {
      key: "complaint",
      icon: <MaterialIcons name="description" size={24} color="#06B6D4" />,
      title: t("tiles.complaint_title"),
      sub: t("tiles.complaint_sub"),
      onPress: () => router.push("/information/asylum/work-permits-complaint"),
    }
  ];

  const contacts = [
    {
      name: t("contacts.labor_office"),
      phone: t("contacts.labor_office_phone"),
      url: t("contacts.labor_office_url"),
      subtitle: t("contacts.labor_office_sub"),
    },
    {
      name: t("contacts.union"),
      phone: t("contacts.union_phone"),
      url: t("contacts.union_url"),
      subtitle: t("contacts.union_sub"),
    },
    {
      name: t("contacts.ngo"),
      phone: t("contacts.ngo_phone"),
      url: t("contacts.ngo_url"),
      subtitle: t("contacts.ngo_sub"),
    }
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="asylumWorkPermits"
      videoId={t("videoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/information/contacts"
    />
  );
}
