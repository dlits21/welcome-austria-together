import React from "react";
import { useTranslation } from "react-i18next";
import DecisionTemplate from "../../../components/DecisionTemplate";

export default function LegalDublinPage() {
  const { t } = useTranslation("asylumDublinStatus");

  const slides = [
    {
      key: "start",
      icon: "🇪🇺",
      title: t("start.title", { defaultValue: "Dublin Regulation" }),
      subtitle: t("start.subtitle", { defaultValue: "What does this mean for you?" }),
      options: [
        {
          text: t("start.options.learn", { defaultValue: "Learn about Dublin rules" }),
          nextKey: "rules"
        },
        {
          text: t("start.options.rights", { defaultValue: "What are my rights?" }),
          nextKey: "rights"
        }
      ]
    },
    {
      key: "rules",
      icon: "📋",
      title: t("rules.title", { defaultValue: "Dublin Rules" }),
      subtitle: t("rules.subtitle", { defaultValue: "The first EU country where you applied is responsible for your case" }),
      options: [
        {
          text: t("rules.options.transfer", { defaultValue: "When can I be transferred?" }),
          nextKey: "transfer"
        },
        {
          text: t("rules.options.appeal", { defaultValue: "Can I appeal?" }),
          nextKey: "appeal"
        }
      ]
    },
    {
      key: "rights",
      icon: "⚖️", 
      title: t("rights.title", { defaultValue: "Your Rights" }),
      subtitle: t("rights.subtitle", { defaultValue: "Even under Dublin regulation, you have important rights" }),
      options: [
        {
          text: t("rights.options.stay", { defaultValue: "Right to stay during process" }),
          nextKey: "protection"
        },
        {
          text: t("rights.options.legal", { defaultValue: "Right to legal assistance" }),
          nextKey: "protection"
        }
      ]
    },
    {
      key: "transfer",
      icon: "✈️",
      title: t("transfer.title", { defaultValue: "Transfer Process" }),
      subtitle: t("transfer.subtitle", { defaultValue: "You have 6 months to be transferred, after which responsibility shifts to current country" }),
      options: [
        {
          text: t("transfer.options.prevent", { defaultValue: "How to prevent transfer?" }),
          nextKey: "appeal"
        }
      ]
    },
    {
      key: "appeal",
      icon: "📝",
      title: t("appeal.title", { defaultValue: "Appeal Options" }),
      subtitle: t("appeal.subtitle", { defaultValue: "You can challenge Dublin decisions in court" }),
      options: []
    },
    {
      key: "protection", 
      icon: "🛡️",
      title: t("protection.title", { defaultValue: "Protection During Process" }),
      subtitle: t("protection.subtitle", { defaultValue: "You cannot be deported while your case is pending" }),
      options: []
    }
  ];

  return (
    <DecisionTemplate
      translationNamespace="asylumDublinStatus"
      slides={slides}
      startKey="start"
    />
  );
}