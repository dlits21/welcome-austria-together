import React from "react";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import SlidesTemplate from "../../../../components/SlidesTemplate";

export default function AsylumAppealsDeadlines() {
  const { t } = useTranslation("asylumAppealsDeadlines");

  const steps = [
    {
      number: 1,
      icon: <MaterialIcons name="announcement" size={28} color="#3B82F6" />,
      title: t("steps.notice_title"),
      description: t("steps.notice_desc"),
    },
    {
      number: 2,
      icon: <MaterialIcons name="upload-file" size={28} color="#10B981" />,
      title: t("steps.submit_title"),
      description: t("steps.submit_desc"),
    },
    {
      number: 3,
      icon: <MaterialIcons name="gavel" size={28} color="#F59E0B" />,
      title: t("steps.hearing_title"),
      description: t("steps.hearing_desc"),
    },
  ];

  return <SlidesTemplate
    translationNamespace="asylumAppealsDeadlines"
    steps={steps}
    videoId={t("exampleVideoId", { defaultValue: "T7Csf2cO1-0" })}/>;
}
