import React from "react";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import StepPageTemplate from "../../../../components/StepPageTemplate";

export default function AsylumApply() {
  const { t } = useTranslation("asylumApply");

  const steps = [
    {
      key: "register",
      icon: <MaterialIcons name="person-add" size={28} color="#2563EB" />,
      title: t("steps.register_title"),
      description: t("steps.register_desc"),
    },
    {
      key: "submit",
      icon: <MaterialIcons name="assignment" size={28} color="#059669" />,
      title: t("steps.submit_title"),
      description: t("steps.submit_desc"),
    },
    {
      key: "interview",
      icon: <MaterialIcons name="record-voice-over" size={28} color="#F59E0B" />,
      title: t("steps.interview_title"),
      description: t("steps.interview_desc"),
    },
    {
      key: "decision",
      icon: <MaterialIcons name="gavel" size={28} color="#EF4444" />,
      title: t("steps.decision_title"),
      description: t("steps.decision_desc"),
    }
  ];

  return (
    <StepPageTemplate
      translationNamespace="asylumApply"
      steps={steps}
      videoId={t("exampleVideoId", { defaultValue: "T7Csf2cO1-0" })}
    />
  );
}
