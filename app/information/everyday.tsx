// app/everyday.tsx
import React from "react";
import InformationPageTemplate from '../../components/InformationPageTemplate';

// Topic icons come from your icon system or MaterialIcons names used by CategoryCard

const PROMINENT_TOPICS = [
  { key: "school", icon: "school", color: "#3B82F6", route: "/information/everyday/school" },
  { key: "kids", icon: "child-care", color: "#F59E0B", route: "/information/everyday/children" },
  { key: "women", icon: "female", color: "#EC4899", route: "/information/everyday/women" },
  { key: "finance", icon: "public", color: "#22C55E", route: "/information/everyday/climate" },
  { key: "transport", icon: "directions-bus", color: "#8B5CF6", route: "/information/everyday/transportation" },
];

const SECONDARY_TOPICS = [
  { key: "sim", icon: "sim-card", color: "#06B6D4", route: "/information/everyday/sim" },
  { key: "recycling", icon: "recycling", color: "#10B981", route: "/information/everyday/recycling" },
  { key: "culture", icon: "theaters", color: "#F97316", route: "/information/everyday/culture" },
  { key: "sport", icon: "fitness-center", color: "#EF4444", route: "/information/everyday/sport" },
  { key: "political", icon: "gavel", color: "#6B7280", route: "/information/everyday/political" },
  { key: "climate", icon: "public", color: "#22C55E", route: "/information/everyday/climate" },
  { key: "volunteering", icon: "public", color: "#22C55E", route: "/information/everyday/climate" },
];

export default function Everyday() {
  return (
    <InformationPageTemplate
      prominentTopics={PROMINENT_TOPICS}
      secondaryTopics={SECONDARY_TOPICS}
      translationNamespace="everyday"
      tutorialData="everyday"
      emergencyRoute="/ask/emergency"
    />
  );
}
