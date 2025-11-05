import React from "react";
import { useTranslation } from "react-i18next";
import SlidesTemplate from "../../../../components/SlidesTemplate";

const getAudioPath = () => {
  try {
    return require("../../../../assets/audio/asylum-apply.mp3");
  } catch {
    return undefined;
  }
};

export default function AsylumApply() {
  const { t } = useTranslation("asylum-apply");

  const steps = [
    {
      id: "register",
      number: 1,
      title: t("steps.register_title", { defaultValue: "Register your asylum application" }),
      route: "/information/asylum/process/apply/register"
    },
    {
      id: "submit",
      number: 2,
      title: t("steps.submit_title", { defaultValue: "Submit required documents" }),
      route: "/information/asylum/process/apply/submit"
    },
    {
      id: "interview",
      number: 3,
      title: t("steps.interview_title", { defaultValue: "Attend asylum interview" }),
      route: "/information/asylum/process/apply/interview"
    },
    {
      id: "decision",
      number: 4,
      title: t("steps.decision_title", { defaultValue: "Await decision" }),
      route: "/information/asylum/process/apply/decision"
    },
    {
      id: "summary",
      number: 5,
      title: t("steps.summary", { defaultValue: "Summary" }),
      route: "/information/asylum/process/apply/summary"
    }
  ];

  return (
    <SlidesTemplate
      translationNamespace="asylum-apply"
      title={t("pageTitle", { defaultValue: "How to Apply for Asylum" })}
      helperText={t("helperText", { defaultValue: "Click the buttons." })}
      steps={steps}
      imagePath={require("../../../../assets/images/Images/refugee_rights.jpg")}
      homePath="/home"
      audioText={t("audioText", { defaultValue: "Welcome to the asylum application process. Follow these steps to complete your application." })}
      audioSource={getAudioPath()}
      tutorialContent={t("tutorialContent", { defaultValue: "This guide will walk you through each step of the asylum application process. Click on each step to learn more." })}
      badgeText={t("badgeText", { defaultValue: "A1" })}
      colorPalette={{
        primary: "#7c3aed",
        secondary: "#a78bfa",
        accent: "#c4b5fd"
      }}
    />
  );
}
