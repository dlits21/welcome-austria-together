import React from "react";
import ChecklistPageTemplate from "../../../../../components/ChecklistPageTemplate";

export default function WhatToBringGP() {
  const required = [
    { id: "id", icon: "🪪", title: "ID or Passport", note: "If you have one" },
    { id: "address", icon: "📍", title: "Proof of Address", note: "Letter, bill, or asylum papers" },
  ];

  const optional = [
    { id: "healthCard", icon: "💳", title: "Health / Insurance Card" },
    { id: "medications", icon: "💊", title: "List of Medications", note: "Names, dosages if possible" },
    { id: "records", icon: "📂", title: "Previous Medical Records", note: "If you have them" },
    { id: "interpreter", icon: "🗣️", title: "Interpreter or Support Person" },
  ];

  return (
    <ChecklistPageTemplate
      title="What to Bring"
      translationNamespace="doctorGP"
      required={required}
      optional={optional}
      warningNote="⚠️ If you don’t have documents, you can still try to register. Ask the GP clinic or NGOs for help."
    />
  );
}
