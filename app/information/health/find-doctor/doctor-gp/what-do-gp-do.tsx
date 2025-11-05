import React from "react";
import { useTranslation } from "react-i18next";
import SlidesTemplateOld from "../../../../../components/SlidesTemplateOld";

export default function WhatGPsDo() {
  const { t } = useTranslation("doctorGP");

  const roles = t("whatGPsDo.roles", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    text: string;
  }>;

  return (
    <SlidesTemplateOld
      translationNamespace="doctorGP"
      roles={roles}
      videoId={t("videoId")}
    />
  );
}
