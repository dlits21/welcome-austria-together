import React from "react";
import { useTranslation } from "react-i18next";
import ChecklistPageTemplate from "../../../components/ChecklistPageTemplate";

export default function LegalRejectedPage() {
  const { t } = useTranslation("asylumRejectedStatus");

  const requiredItems = [
    {
      id: "appeal",
      icon: "📝", 
      title: t("required.appeal.title", { defaultValue: "File Appeal Immediately" }),
      note: t("required.appeal.note", { defaultValue: "You usually have only 7-14 days to appeal the decision" })
    },
    {
      id: "legal_help",
      icon: "⚖️",
      title: t("required.legal.title", { defaultValue: "Get Legal Assistance" }),
      note: t("required.legal.note", { defaultValue: "Contact a lawyer or NGO specializing in asylum law immediately" })
    },
    {
      id: "documents",
      icon: "📋",
      title: t("required.documents.title", { defaultValue: "Gather All Documents" }),
      note: t("required.documents.note", { defaultValue: "Collect all papers related to your case and rejection notice" })
    }
  ];

  const optionalItems = [
    {
      id: "new_evidence",
      icon: "🔍",
      title: t("optional.evidence.title", { defaultValue: "New Evidence" }),
      note: t("optional.evidence.note", { defaultValue: "Any new proof about your situation that wasn't considered before" })
    },
    {
      id: "medical",
      icon: "🏥",
      title: t("optional.medical.title", { defaultValue: "Medical Documentation" }),
      note: t("optional.medical.note", { defaultValue: "Medical reports that support your case, especially for trauma or health issues" })
    },
    {
      id: "witnesses",
      icon: "👥", 
      title: t("optional.witnesses.title", { defaultValue: "Witness Statements" }),
      note: t("optional.witnesses.note", { defaultValue: "Letters from people who can confirm your story or situation" })
    }
  ];

  return (
    <ChecklistPageTemplate
      translationNamespace="asylumRejectedStatus"
      title={t("pageTitle", { defaultValue: "After Rejection - Act Fast" })}
      requiredItems={requiredItems}
      optionalItems={optionalItems}
      warningNote={t("warning", { defaultValue: "⚠️ TIME IS CRITICAL: Most appeals must be filed within 7-14 days. Do not delay seeking help." })}
    />
  );
}