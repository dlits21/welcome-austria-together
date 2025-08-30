import React from "react";
import DecisionTemplate from "../../../../../components/DecisionTemplate";

export default function WhenToSeeGP() {
  const slides = [
    {
      key: "start",
      icon: "🤒",
      title: "Do you have a very high fever (over 39°C)?",
      options: [
        { text: "Yes", highlight: "gp", nextKey: "gp-contact" },
        { text: "No", nextKey: "injury" },
      ],
    },
    {
      key: "injury",
      icon: "🩹",
      title: "Do you have a serious injury or heavy bleeding?",
      options: [
        { text: "Yes", highlight: "emergency", nextKey: "call-emergency" },
        { text: "No", nextKey: "chronic" },
      ],
    },
    {
      key: "chronic",
      icon: "🫁",
      title: "Do you have ongoing symptoms (cough, pain, skin issues)?",
      options: [
        { text: "Yes", highlight: "gp", nextKey: "gp-contact" },
        { text: "No, it's something small", highlight: "self", nextKey: "self-care" },
      ],
    },
    {
      key: "gp-contact",
      icon: "🏥",
      title: "You should see a GP.",
      subtitle: "They can examine you and refer you if needed.",
    },
    {
      key: "call-emergency",
      icon: "🚑",
      title: "This is an emergency.",
      subtitle: "Call 112 immediately or go to the nearest hospital.",
    },
    {
      key: "self-care",
      icon: "🌿",
      title: "Self-care may be enough.",
      subtitle: "Rest, drink water, try paracetamol for fever or pain.",
    },
  ];

  const extraInfo = {
    title: "More Information",
    sections: [
      {
        icon: "📅",
        heading: "Book an Appointment",
        text: "Most GP practices require you to book an appointment in advance. Some also have online booking.",
      },
      {
        icon: "🏥",
        heading: "Walk-in Clinics",
        text: "If you cannot reach your GP, you can visit a walk-in clinic for urgent but not life-threatening issues.",
      },
      {
        icon: "🪪",
        heading: "Bring Important Documents",
        text: "Take your health card, ID, and any medical records or medication you are using.",
      },
    ],
  };

  return <DecisionTemplate
            translationNamespace="doctorGP"
            slides={slides}
            startKey="start"
            extraInfo={extraInfo} />;
}
