import React from "react";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import SlidesTemplate from "../../../../components/SlidesTemplate";

export default function AsylumRights() {
  const { t } = useTranslation("asylumRights");

  const roles = [
    {
      icon: <MaterialIcons name="gavel" size={24} color="#EF4444" />,
      title: t("slides.rights1_title"),
      text: t("slides.rights1_text"),
    },
    {
      icon: <MaterialIcons name="gavel" size={24} color="#7C3AED" />,
      title: t("slides.rights2_title"),
      text: t("slides.rights2_text"),
    },
    {
      icon: <MaterialIcons name="gavel" size={24} color="#F59E0B" />,
      title: t("slides.rights3_title"),
      text: t("slides.rights3_text"),
    },
    {
      icon: <MaterialIcons name="gavel" size={24} color="#059669" />,
      title: t("slides.rights4_title"),
      text: t("slides.rights4_text"),
    }
  ];

  return (
    <SlidesTemplate
      translationNamespace="asylumRights"
      roles={roles}
      videoId={t("videoId", { defaultValue: "GkZ5e6b2u4w" })}
    />
  );
}
