import React from "react";
import { useTranslation } from "react-i18next";
import SlidesTemplate from "../../../../../components/SlidesTemplate";

export default function HowToRegisterGP() {
  const { t } = useTranslation("doctorGP");

  const steps = t("howToRegister.steps", { returnObjects: true }) as Array<{
    number: number;
    icon: string;
    title: string;
    text: string;
  }>;

  const checklist = t("howToRegister.checklist", { returnObjects: true }) as string[];

  return (
    <SlidesTemplate
      translationNamespace="doctorGP"
      steps={steps}
      checklist={checklist}
      videoId={t("videoId")}
    />
  );
}