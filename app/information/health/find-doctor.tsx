import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function FindDoctor() {
  const { t } = useTranslation("findDoctor");
  const router = useRouter();

  // Tiles explain the process in small, easy steps
  const tiles = [
      {
        key: "when-to-see",
        icon: "❓",
        title: t("doctor.tiles.when_title"),
        sub: t("doctor.tiles.when_sub"),
        onPress: () => router.push("/information/healthcare/when-to-see-doctor"),
      },
    {
      key: "insurance",
      icon: "💳",
      title: t("doctor.tiles.insurance_title"),
      sub: t("doctor.tiles.insurance_sub"),
      onPress: () => router.push("/information/healthcare/doctor-insurance"),
    },
    {
      key: "gp",
      icon: "👩‍⚕️",
      title: t("doctor.tiles.gp_title"),
      sub: t("doctor.tiles.gp_sub"),
      onPress: () => router.push("/information/health/find-doctor/doctor-gp"),
    },
    {
      key: "walkin",
      icon: "🚶",
      title: t("doctor.tiles.walkin_title"),
      sub: t("doctor.tiles.walkin_sub"),
      onPress: () => router.push("/information/healthcare/doctor-walkin"),
    },
    {
      key: "specialist",
      icon: "🩺",
      title: t("doctor.tiles.specialist_title"),
      sub: t("doctor.tiles.specialist_sub"),
      onPress: () => router.push("/information/healthcare/doctor-specialist"),
    },
    {
      key: "children",
      icon: "👶",
      title: t("doctor.tiles.children_title"),
      sub: t("doctor.tiles.children_sub"),
      onPress: () => router.push("/information/healthcare/doctor-children"),
    },
    {
      key: "hotlines",
      icon: "☎️",
      title: t("doctor.tiles.hotlines_title"),
      sub: t("doctor.tiles.hotlines_sub"),
      onPress: () => router.push("/information/contacts"),
    },
  ];

  // Official contacts & directories
  const contacts = [
    {
      name: t("doctor.contacts.national_hotline"),
      phone: "1450",
      subtitle: t("doctor.contacts.national_sub"),
    },
    {
      name: t("doctor.contacts.directory"),
      url: t("doctor.contacts.directory_url"),
      subtitle: t("doctor.contacts.directory_sub", { defaultValue: "Search doctors by area and specialty" }),
    },
    {
      name: t("doctor.contacts.redcross"),
      url: t("doctor.contacts.redcross_url"),
      subtitle: t("doctor.contacts.redcross_sub"),
    },
    {
      name: t("doctor.contacts.ngo_name"),
      phone: t("doctor.contacts.ngo_phone"),
      subtitle: t("doctor.contacts.ngo_sub"),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="findDoctor"
      videoId={t("exampleVideoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/information/contacts"
    />
  );
}
