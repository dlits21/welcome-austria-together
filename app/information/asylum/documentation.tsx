// app/information/asylum/documents.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import DocumentChecklistTemplate from "../../../components/DocumentChecklistTemplate";

export default function AsylumDocuments() {
  const { t } = useTranslation("asylumDocuments");

  // Required documents
  const required = [
    { id: "passport", title: t("required.passport_id_title"), note: t("required.passport_id_note") },
    { id: "birth", title: t("required.application_form_title"), note: t("required.application_form_note") },
    { id: "photos", title: t("required.photos_title"), note: t("required.photos_note") },
  ];

  // Optional but helpful
  const optional = [
    { id: "marriage", title: t("optional.proof_origin_title"), note: t("optional.proof_origin_note") },
    { id: "marriage", title: t("optional.birth_title"), note: t("optional.birth_title_note") },
    { id: "marriage", title: t("optional.marriage_title"), note: t("optional.marriage_title_note") },
    { id: "medical", title: t("optional.medical_records_title"), note: t("optional.medical_records_note") },
    { id: "medical", title: t("optional.proof_photos_title"), note: t("optional.proof_photos_title_note") },
    { id: "medical", title: t("optional.school_work_certificates_title"), note: t("optional.school_work_certificates_note") },
  ];

  return (
    <DocumentChecklistTemplate
      translationNamespace="asylumDocuments"
      title={t("pageTitle", { defaultValue: "Documentation & Evidence" })}
      required={required}
      optional={optional}
      videoId="Q607TYRBxFU"
      disclaimer={t("warning", {
        defaultValue:
          "This checklist is only guidance. Always seek legal help.",
      })}
    />
  );
}
