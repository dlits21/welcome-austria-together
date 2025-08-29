import React from "react";
import InformationPageTemplate from '../../components/InformationPageTemplate';

const prominentTopics = [
  {
    key: "emergencyLegalHelp",
    icon: "🚨",
    color: "#DC2626",
    route: "/ask/legal-support"
  },
  {
    key: "asylumProcess",
    icon: "📋",
    color: "#2563EB",
    route: "/information/asylum/process"
  },
  {
    key: "appealsReview",
    icon: "⚖️",
    color: "#7C3AED",
    route: "/information/asylum/appeals"
  },
  {
    key: "interviewPrep",
    icon: "🗣️",
    color: "#059669",
    route: "/information/asylum/interview"
  },
  {
    key: "documentation",
    icon: "📄",
    color: "#EA580C",
    route: "/information/asylum/documentation"
  },
  {
    key: "legalStatus",
    icon: "🏛️",
    color: "#0891B2",
    route: "/information/asylum/status"
  },
  {
    key: "familyReunification",
    icon: "👨‍👩‍👧‍👦",
    color: "#DB2777",
    route: "/information/asylum/family"
  },
  {
    key: "workRights",
    icon: "💼",
    color: "#16A34A",
    route: "/information/asylum/work"
  }
];

const secondaryTopics = [
  {
    key: "housingBenefits",
    icon: "🏠",
    color: "#6366F1",
    route: "/information/asylum/housing"
  },
  {
    key: "legalAidDirectory",
    icon: "📞",
    color: "#8B5CF6",
    route: "/information/asylum/legal-aid"
  },
  {
    key: "policeRights",
    icon: "👮‍♂️",
    color: "#F59E0B",
    route: "/information/asylum/police"
  },
  {
    key: "criminalCharges",
    icon: "⚠️",
    color: "#EF4444",
    route: "/information/asylum/criminal"
  },
  {
    key: "dataPrivacy",
    icon: "🔒",
    color: "#64748B",
    route: "/information/asylum/privacy"
  },
  {
    key: "caseTracking",
    icon: "📊",
    color: "#10B981",
    route: "/information/asylum/tracking"
  },
  {
    key: "faqsGlossary",
    icon: "❓",
    color: "#F97316",
    route: "/information/asylum/faqs"
  },
  {
    key: "templates",
    icon: "📝",
    color: "#06B6D4",
    route: "/information/asylum/templates"
  }
];

export default function AsylumInformation() {
  return (
    <InformationPageTemplate
      prominentTopics={prominentTopics}
      secondaryTopics={secondaryTopics}
      translationNamespace="asylum"
      tutorialData="asylum"
      emergencyRoute="/ask/legal-support"
    />
  );
}