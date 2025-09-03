import React from "react";
import { useTranslation } from "react-i18next";
import SlidesTemplate from "../../../../components/SlidesTemplate";

export default function LegalRefugeePage() {
  const { t } = useTranslation("asylumRefugeeStatus");

  const roles = [
    {
      translationNamespace: "asylumRefugeeStatus",
      icon: "🛡️",
      title: t("protection.title", { defaultValue: "Full Protection" }),
      text: t("protection.text", { defaultValue: "As a recognized refugee, you receive comprehensive protection under international law." })
    },
    {
      translationNamespace: "asylumRefugeeStatus", 
      icon: "💼",
      title: t("work.title", { defaultValue: "Work Rights" }),
      text: t("work.text", { defaultValue: "You have full access to the labor market and can work in any job without restrictions." })
    },
    {
      translationNamespace: "asylumRefugeeStatus",
      icon: "🏠", 
      title: t("housing.title", { defaultValue: "Housing Rights" }),
      text: t("housing.text", { defaultValue: "You can access social housing and rental assistance programs like any citizen." })
    },
    {
      translationNamespace: "asylumRefugeeStatus",
      icon: "👨‍👩‍👧‍👦",
      title: t("family.title", { defaultValue: "Family Reunification" }),
      text: t("family.text", { defaultValue: "You can apply to bring your spouse and children to join you through family reunification." })
    }
  ];

  return (
    <SlidesTemplate 
      roles={roles}
      videoId={t("videoUrl", { defaultValue: "Q607TYRBxFU" })}
    />
  );
}