import React from "react";
import { useTranslation } from "react-i18next";
import SlidesTemplate from "../../../../../components/SlidesTemplate";

export default function WhatGPsDo() {
  const { t } = useTranslation("doctor-gp");

  const roles = t("whatGPsDo.roles", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    text: string;
  }>;

  return (
    <SlidesTemplate
      translationNamespace="doctor-gp"
      roles={roles}
      videoId={t("videoId")}
    />
  );
}
