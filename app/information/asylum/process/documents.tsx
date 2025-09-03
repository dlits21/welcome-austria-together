import React from "react";
import { useTranslation } from "react-i18next";
import ChecklistPageTemplate from "../../../../components/ChecklistPageTemplate";

export default function AsylumDocuments() {
  const { t } = useTranslation("asylumDocuments");

  const required = [
    {
      id: "passport_id",
      icon: "🛂",
      title: t("required.passport_id_title"),
      note: t("required.passport_id_note"),
    },
    {
      id: "application_form",
      icon: "📄",
      title: t("required.application_form_title"),
      note: t("required.application_form_note"),
    },
    {
      id: "photos",
      icon: "🖼️",
      title: t("required.photos_title"),
      note: t("required.photos_note"),
    }
  ];

  const optional = [
    {
      id: "proof_origin",
      icon: "🌍",
      title: t("optional.proof_origin_title"),
      note: t("optional.proof_origin_note"),
    },
    {
      id: "medical_records",
      icon: "🏥",
      title: t("optional.medical_records_title"),
      note: t("optional.medical_records_note"),
    },
    {
      id: "school_work_certificates",
      icon: "🎓",
      title: t("optional.school_work_certificates_title"),
      note: t("optional.school_work_certificates_note"),
    }
  ];

  return (
    <ChecklistPageTemplate
      translationNamespace="asylumDocuments"
      title={t("title")}
      required={required}
      optional={optional}
      warningNote={t("warning")}
    />
  );
}
