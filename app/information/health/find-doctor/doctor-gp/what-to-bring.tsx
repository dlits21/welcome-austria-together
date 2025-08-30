import React from "react";
import { useTranslation } from "react-i18next";
import ChecklistPageTemplate from "../../../../../components/ChecklistPageTemplate";

export default function WhatToBringGP() {
  const { t } = useTranslation("doctorGP");

  const required = t("whatToBring.required", { returnObjects: true }) as Array<{
    id: string;
    icon: string;
    title: string;
    note?: string;
  }>;

  const optional = t("whatToBring.optional", { returnObjects: true }) as Array<{
    id: string;
    icon: string;
    title: string;
    note?: string;
  }>;

  return (
    <ChecklistPageTemplate
      title={t("whatToBring.title")}
      translationNamespace="doctorGP"
      required={required}
      optional={optional}
      warningNote={t("whatToBring.warningNote")}
    />
  );
}