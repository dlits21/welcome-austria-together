import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import SummaryPageTemplate from "../../../../components/SummaryPageTemplate";

export default function DoctorGP() {
  const { t } = useTranslation("healthcare");
  const router = useRouter();

  const tiles = [
    {
      key: "when",
      icon: "⏰",
      title: t("doctor.gp.tiles.when_title", { defaultValue: "When to see a GP" }),
      sub: t("doctor.gp.tiles.when_sub", { defaultValue: "For non-emergencies, everyday health issues" }),
      onPress: () => router.push("/information/health/find-doctor/doctor-gp/when-to-see"),
    },
    {
      key: "what",
      icon: "🩺",
      title: t("doctor.gp.tiles.what_title", { defaultValue: "What GPs do" }),
      sub: t("doctor.gp.tiles.what_sub", { defaultValue: "Exams, prescriptions, referrals" }),
      onPress: () => router.push("/information/health/find-doctor/doctor-gp/what-do-gp-do"),
    },
    {
      key: "register",
      icon: "📝",
      title: t("doctor.gp.tiles.register_title", { defaultValue: "How to register" }),
      sub: t("doctor.gp.tiles.register_sub", { defaultValue: "Choose a doctor near you, bring ID + insurance" }),
      onPress: () => router.push("/information/health/find-doctor/doctor-gp/how-to-register"),
    },
    {
      key: "bring",
      icon: "👜",
      title: t("doctor.gp.tiles.bring_title", { defaultValue: "What to bring" }),
      sub: t("doctor.gp.tiles.bring_sub", { defaultValue: "Insurance card, ID, medical documents" }),
      onPress: () => router.push("/information/health/find-doctor/doctor-gp/what-to-bring"),
    },
  ];

  const contacts = [
    {
      name: t("doctor.gp.contacts.directory", { defaultValue: "Find a GP – Doctor Directory" }),
      url: t("doctor.gp.contacts.directory_url", { defaultValue: "https://www.arztsuche.at" }),
      subtitle: t("doctor.gp.contacts.directory_sub", { defaultValue: "Search GPs by location and language" }),
    },
    {
      name: t("doctor.gp.contacts.hotline", { defaultValue: "Health Hotline 1450" }),
      phone: "1450",
      subtitle: t("doctor.gp.contacts.hotline_sub", { defaultValue: "Advice & info on nearest available doctor" }),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="healthcare"
      videoId={t("doctor.gp.videoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/information/contacts"
    />
  );
}
