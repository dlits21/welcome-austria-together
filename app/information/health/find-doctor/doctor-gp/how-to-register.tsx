import React from "react";
import { useTranslation } from "react-i18next";
import StepPageTemplate from "../../../../../components/StepPageTemplate";

export default function HowToRegisterGP() {
  const { t } = useTranslation("doctor-gp");

  const steps = t("howToRegister.steps", { returnObjects: true }) as Array<{
    number: number;
    icon: string;
    title: string;
    text: string;
  }>;

  const checklist = t("howToRegister.checklist", { returnObjects: true }) as string[];

  return (
    <StepPageTemplate
      translationNamespace="doctor-gp"
      steps={steps}
      checklist={checklist}
      videoId={t("videoId")}
    />
  );
}