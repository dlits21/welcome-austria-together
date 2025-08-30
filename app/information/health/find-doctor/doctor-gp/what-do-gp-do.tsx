import React from "react";
import SlidesTemplate from "../../../../../components/SlidesTemplate";

export default function WhatGPsDo() {
  const roles = [
    {
      icon: "👂",
      title: "First point of contact",
      text: "GPs are usually your first stop for health problems. They listen and decide what to do next.",
    },
    {
      icon: "💊",
      title: "Prescriptions",
      text: "They can give prescriptions for medicine you need.",
    },
    {
      icon: "🩺",
      title: "Basic checks",
      text: "They do blood pressure, blood tests, or simple examinations.",
    },
    {
      icon: "📜",
      title: "Referrals",
      text: "If you need a specialist, they write you a referral.",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Family care",
      text: "They care for both adults and children, often the whole family.",
    },
  ];

  return (
    <SlidesTemplate
      translationNamespace="doctorGP"
      roles={roles}
      videoId="Q607TYRBxFU" // Example GP explainer video
    />
  );
}
