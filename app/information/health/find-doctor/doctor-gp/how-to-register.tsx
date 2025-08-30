import React from "react";
import StepPageTemplate from "../../../../../components/StepPageTemplate";

export default function HowToRegisterGP() {
  const steps = [
    {
      number: 1,
      icon: "📍",
      title: "Find a GP clinic near you",
      text: "Search online or ask local NGOs / neighbors which GP practices accept new patients.",
    },
    {
      number: 2,
      icon: "📝",
      title: "Fill out a registration form",
      text: "Most clinics have a paper form or online form. Staff can help if your language is different.",
    },
    {
      number: 3,
      icon: "🪪",
      title: "Bring documents",
      text: "Usually an ID or passport and proof of address (like a letter, bill, or asylum papers).",
    },
    {
      number: 4,
      icon: "✅",
      title: "Confirmation",
      text: "The clinic will confirm and send you a letter or card once you are registered.",
    },
  ];

  const checklist = [
    "Passport or ID (if available)",
    "Proof of address (rental contract, bill, asylum letter)",
    "Previous medical info (if you have it)",
    "Interpreter or support person if language is a barrier",
  ];

  return (
    <StepPageTemplate
      steps={steps}
      checklist={checklist}
      videoId="Q607TYRBxFU" // Example GP registration video
    />
  );
}