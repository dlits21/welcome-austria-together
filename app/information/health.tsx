// app/information/health.tsx
import React from "react";
import InformationPageTemplate from "../../components/InformationPageTemplate";

// Prominent health topics - visually emphasized
const PROMINENT_TOPICS = [
  { key: "emergency", icon: "local-hospital", color: "#DC2626", route: "/ask/emergency" },
  { key: "findDoctor", icon: "medical-services", color: "#3B82F6", route: "/information/health/find-doctor" },
  { key: "mentalHealth", icon: "psychology", color: "#8B5CF6", route: "/information/health/mental-health" },
  { key: "children", icon: "child-care", color: "#F59E0B", route: "/information/health/children" },
  { key: "trustedContacts", icon: "contact-phone", color: "#059669", route: "/information/health/contacts" },
  { key: 'generalInformation', color: '#3B82F6', icon: 'help', route: "/information/health/generalInformation" },
  { key: 'insurance', color: '#059669', icon: 'attach-money', route: "/information/health/insurance" }
];

// Secondary health topics
const SECONDARY_TOPICS = [
  { key: "healthSystem", icon: "local-hospital", color: "#6B7280", route: "/information/health/system" },
  { key: "physicalHealth", icon: "fitness-center", color: "#10B981", route: "/information/health/physical" },
  { key: "wantToTalk", icon: "chat", color: "#EC4899", route: "/information/health/talk" },
  { key: "urgentHelp", icon: "emergency", color: "#EF4444", route: "/ask/emergency" },
  { key: "crisisSupport", icon: "support", color: "#7C3AED", route: "/information/health/crisis" },
  { key: "prescriptions", icon: "local-pharmacy", color: "#0891B2", route: "/information/health/prescription" },
  { key: "vaccinations", icon: "vaccines", color: "#22C55E", route: "/information/health/vaccinations" },
  { key: "reproductive", icon: "pregnant-woman", color: "#F97316", route: "/information/health/reproductive" },
  { key: "genderViolence", icon: "shield", color: "#BE185D", route: "/information/health/genderViolence" },
  { key: "chronicCare", icon: "monitor-heart", color: "#65A30D", route: "/information/health/chronic" },
  { key: "dental", icon: "medical-services", color: "#0284C7", route: "/information/health/dental" },
  { key: "addiction", icon: "healing", color: "#7C2D12", route: "/information/health/addiction" },
  { key: "disability", icon: "accessible", color: "#374151", route: "/information/health/disability" },
  { key: "healthRights", icon: "gavel", color: "#1F2937", route: "/information/health/rights" },
  { key: "logistics", icon: "directions", color: "#475569", route: "/information/health/logistics" },
  { key: "publicHealth", icon: "public", color: "#166534", route: "/information/health/public-alerts" },
];

export default function Health() {
  return (
    <InformationPageTemplate
      prominentTopics={PROMINENT_TOPICS}
      secondaryTopics={SECONDARY_TOPICS}
      translationNamespace="health"
      tutorialData="health"
      emergencyRoute="/ask/emergency"
      height={350}
    />
  );
}