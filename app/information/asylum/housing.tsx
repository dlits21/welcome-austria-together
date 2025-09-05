import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function HousingPage() {
  const { t } = useTranslation("asylumHousing");
  const router = useRouter();

  const tiles = [
    {
      key: "eligibility",
      icon: <MaterialIcons name="home" size={24} color="#3B82F6" />,
      title: t("tiles.eligibility_title"),
      sub: t("tiles.eligibility_sub"),
      onPress: () => router.push("/information/asylum/housing-eligibility"),
    },
    {
      key: "appeals",
      icon: <MaterialIcons name="gavel" size={24} color="#EF4444" />,
      title: t("tiles.appeals_title"),
      sub: t("tiles.appeals_sub"),
      onPress: () => router.push("/information/asylum/housing-appeals"),
    },
    {
      key: "benefits",
      icon: <MaterialIcons name="account-balance-wallet" size={24} color="#10B981" />,
      title: t("tiles.benefits_title"),
      sub: t("tiles.benefits_sub"),
      onPress: () => router.push("/information/asylum/housing-benefits"),
    },
    {
      key: "urgent",
      icon: <MaterialIcons name="hotel" size={24} color="#F59E0B" />,
      title: t("tiles.urgent_title"),
      sub: t("tiles.urgent_sub"),
      onPress: () => router.push("/information/asylum/housing-urgent"),
    }
  ];

  const contacts = [
    {
      name: t("contacts.housing_office"),
      phone: t("contacts.housing_office_phone"),
      url: t("contacts.housing_office_url"),
      subtitle: t("contacts.housing_office_sub"),
    },
    {
      name: t("contacts.social_benefits"),
      phone: t("contacts.social_benefits_phone"),
      url: t("contacts.social_benefits_url"),
      subtitle: t("contacts.social_benefits_sub"),
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
      translationNamespace="asylumHousing"
      videoId={t("videoId", { defaultValue: "abcd1234" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/information/contacts"
    />
  );
}
