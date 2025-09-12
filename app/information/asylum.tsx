import React from "react";
import InformationPageTemplate from '../../components/InformationPageTemplate';

const prominentTopics = [
  {
    key: "emergencyLegalHelp",
    icon: "warning",
    color: "#DC2626",
    route: "/ask/legal-support"
  },
  {
    key: "asylumProcess",
    icon: "assignment",
    color: "#2563EB",
    route: "/information/asylum/process"
  },
  {
    key: "appealsReview",
    icon: "gavel",
    color: "#7C3AED",
    route: "/information/asylum/appeals"
  },
  {
    key: "interviewPrep",
    icon: "record-voice-over",
    color: "#059669",
    route: "/information/asylum/interview"
  },
  {
    key: "documentation",
    icon: "description",
    color: "#EA580C",
    route: "/information/asylum/documentation"
  },
  {
    key: "legalStatus",
    icon: "account-balance",
    color: "#0891B2",
    route: "/information/asylum/status"
  },
  {
    key: "familyReunification",
    icon: "family-restroom",
    color: "#DB2777",
    route: "/information/asylum/family"
  },
  {
    key: "workRights",
    icon: "work",
    color: "#16A34A",
    route: "/information/asylum/work"
  }
];

const secondaryTopics = [
  {
    key: "housingBenefits",
    icon: "home",
    color: "#6366F1",
    route: "/information/asylum/housing"
  },
  {
    key: "legalAidDirectory",
    icon: "phone",
    color: "#8B5CF6",
    route: "/ask/legal-support"
  },
  {
    key: "policeRights",
    icon: "local-police",
    color: "#F59E0B",
    route: "/information/asylum/police"
  },
  {
    key: "criminalCharges",
    icon: "report",
    color: "#EF4444",
    route: "/information/asylum/criminal"
  },
  {
    key: "dataPrivacy",
    icon: "lock",
    color: "#64748B",
    route: "/information/asylum/privacy"
  },
  {
    key: "caseTracking",
    icon: "timeline",
    color: "#10B981",
    route: "/information/asylum/tracking"
  },
  {
    key: "faqsGlossary",
    icon: "help",
    color: "#F97316",
    route: "/information/asylum/faqs"
  },
  {
    key: "templates",
    icon: "edit-note",
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
      height={370}
    />
  );
}