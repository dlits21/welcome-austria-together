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
      title: t("tiles.signs_title", { defaultValue: "Signs to watch" }),
      sub: t("tiles.signs_sub", { defaultValue: "Changes in sleep, eating, mood" }),
      onPress: () => router.push("/information/healthcare/mental-signs"),
    },
    {
      key: "what",
      icon: "🛠️",
      title: t("tiles.what_title", { defaultValue: "What to do" }),
      sub: t("tiles.what_sub", { defaultValue: "Simple steps to feel better" }),
      onPress: () => router.push("/information/healthcare/what-to-do"),
    },
    {
      key: "seek",
      icon: "🏥",
      title: t("tiles.seek_title", { defaultValue: "Where to get help" }),
      sub: t("tiles.seek_sub", { defaultValue: "NGOs, clinics, doctors" }),
      onPress: () => router.push("/information/healthcare/where-to-get-help"),
    },
    {
      key: "self",
      icon: "🌿",
      title: t("tiles.self_title", { defaultValue: "Small self-care" }),
      sub: t("tiles.self_sub", { defaultValue: "Breathing, short walks, routines" }),
      onPress: () => router.push("/information/healthcare/self-care"),
    },
    {
      key: "for-parents",
      icon: "👨‍👩‍👧",
      title: t("tiles.parents_title", { defaultValue: "For parents" }),
      sub: t("tiles.parents_sub", { defaultValue: "How to support your child" }),
      onPress: () => router.push("/information/healthcare/for-parents"),
    },
    {
      key: "hotlines",
      icon: "☎️",
      title: t("tiles.hotlines_title", { defaultValue: "Hotlines & immediate" }),
      sub: t("tiles.hotlines_sub", { defaultValue: "Call if someone is at risk" }),
      onPress: () => router.push("/information/contacts"),
    },
  ];

  // Contacts configuration
  const contacts = [
    {
      name: t("trusted.ngo_name", { defaultValue: "Local mental health NGO" }),
      phone: t("trusted.ngo_phone", { defaultValue: "0800 111 222" }),
      url: t("trusted.ngo_url", { defaultValue: "https://example.org" }),
      subtitle: t("trusted.ngo_sub", { defaultValue: "Confidential help in multiple languages" }),
    },
    {
      name: t("trusted.child_services", { defaultValue: "Child / youth services" }),
      phone: t("trusted.child_phone", { defaultValue: "0800 333 444" }),
      subtitle: t("trusted.child_sub", { defaultValue: "Support for children and families" }),
    },
    {
      name: t("trusted.national_hotline", { defaultValue: "National Suicide Prevention" }),
      phone: t("trusted.national_phone", { defaultValue: "116 123" }),
      url: t("trusted.national_url", { defaultValue: "https://examplehelpline.org" }),
      subtitle: t("trusted.national_sub", { defaultValue: "24/7 hotline" }),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="healthcare"
      videoId={t("exampleVideoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/information/contacts"
    />
  );
}


