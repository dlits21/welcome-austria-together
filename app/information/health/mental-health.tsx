import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";


export default function MentalHealthBasics() {
  const { t } = useTranslation("mentalHealth");
  const router = useRouter();

  // Tiles content (short entries)
  const tiles = [
    {
      key: "signs",
      icon: "⚠️",
      title: t("tiles.signs_title"),
      sub: t("tiles.signs_sub"),
      onPress: () => router.push("/information/healthcare/mental-signs"),
    },
    {
      key: "what",
      icon: "🛠️",
      title: t("tiles.what_title"),
      sub: t("tiles.what_sub"),
      onPress: () => router.push("/information/healthcare/what-to-do"),
    },
    {
      key: "seek",
      icon: "🏥",
      title: t("tiles.seek_title"),
      sub: t("tiles.seek_sub"),
      onPress: () => router.push("/information/healthcare/where-to-get-help"),
    },
    {
      key: "self",
      icon: "🌿",
      title: t("tiles.self_title"),
      sub: t("tiles.self_sub"),
      onPress: () => router.push("/information/healthcare/self-care"),
    },
    {
      key: "for-parents",
      icon: "👨‍👩‍👧",
      title: t("tiles.parents_title"),
      sub: t("tiles.parents_sub"),
      onPress: () => router.push("/information/healthcare/for-parents"),
    },
    {
      key: "hotlines",
      icon: "☎️",
      title: t("tiles.hotlines_title"),
      sub: t("tiles.hotlines_sub"),
      onPress: () => router.push("/information/contacts"),
    },
  ];

  // Contacts configuration
  const contacts = [
    {
      name: t("trusted.ngo_name"),
      phone: t("trusted.ngo_phone"),
      url: t("trusted.ngo_url"),
      subtitle: t("trusted.ngo_sub"),
    },
    {
      name: t("trusted.child_services"),
      phone: t("trusted.child_phone"),
      subtitle: t("trusted.child_sub"),
    },
    {
      name: t("trusted.national_hotline"),
      phone: t("trusted.national_phone"),
      url: t("trusted.national_url"),
      subtitle: t("trusted.national_sub"),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="mentalHealth"
      videoId={t("exampleVideoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/information/contacts"
    />
  );
}


