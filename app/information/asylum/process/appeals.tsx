import React from "react";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import ChecklistPageTemplate from "../../../../components/ChecklistPageTemplate";

export default function AsylumAppeals() {
  const { t } = useTranslation("asylumProcessAppeals");

  const required = [
    {
      id: "appeal_letter",
      icon: "✉️",
      title: t("required.appeal_letter_title"),
      note: t("required.appeal_letter_note"),
    },
    {
      id: "rejection_notice",
      icon: "📄",
      title: t("required.rejection_notice_title"),
      note: t("required.rejection_notice_note"),
    },
    {
      id: "legal_help",
      icon: "⚖️",
      title: t("required.legal_help_title"),
      note: t("required.legal_help_note"),
    }
  ];

  const optional = [
    {
      id: "supporting_documents",
      icon: "📚",
      title: t("optional.supporting_documents_title"),
      note: t("optional.supporting_documents_note"),
    },
    {
      id: "witness_statements",
      icon: "🗣️",
      title: t("optional.witness_statements_title"),
      note: t("optional.witness_statements_note"),
    }
  ];

  return (
    <ChecklistPageTemplate
      translationNamespace="asylumProcessAppeals"
      title={t("title")}
      required={required}
      optional={optional}
      warningNote={t("warning")}
    />
  );
}
