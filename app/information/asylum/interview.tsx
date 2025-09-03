import React from "react";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import InterviewPrepTemplate from "../../../components/InterviewPrepTemplate";

export default function AsylumInterview() {
  const { t } = useTranslation("asylumInterview");

  // Steps: Before, During, After
  const steps = [
    {
      id: "before",
      icon: <MaterialIcons name="schedule" size={28} color="#2563EB" />,
      title: t("steps.before.title", { defaultValue: "Before the interview" }),
      description: t("steps.before.text", {
        defaultValue: "Bring documents, prepare your story, request interpreter.",
      }),
    },
    {
      id: "during",
      icon: <MaterialIcons name="hearing" size={28} color="#059669" />,
      title: t("steps.during.title", { defaultValue: "During the interview" }),
      description: t("steps.during.text", {
        defaultValue: "Answer honestly, take your time, use the interpreter.",
      }),
    },
    {
      id: "after",
      icon: <MaterialIcons name="check-circle" size={28} color="#F59E0B" />,
      title: t("steps.after.title", { defaultValue: "After the interview" }),
      description: t("steps.after.text", {
        defaultValue: "Check transcript, correct mistakes, keep all papers.",
      }),
    },
  ];

  // Slides: Do’s & Don’ts
  const slides = [
    {
      id: "do1",
      icon: "✅",
      title: t("slides.do1.title", { defaultValue: "Do: Be Honest" }),
      text: t("slides.do1.text", {
        defaultValue: "Always tell the truth, even if it is difficult.",
      }),
    },
    {
      id: "do2",
      icon: "✅",
      title: t("slides.do2.title", { defaultValue: "Do: Ask for Clarification" }),
      text: t("slides.do2.text", {
        defaultValue: "If you don’t understand a question, ask again.",
      }),
    },
    {
      id: "dont1",
      icon: "❌",
      title: t("slides.dont1.title", { defaultValue: "Don’t: Guess or Invent" }),
      text: t("slides.dont1.text", {
        defaultValue: "Never make up an answer if you don’t know.",
      }),
    },
    {
      id: "dont2",
      icon: "❌",
      title: t("slides.dont2.title", { defaultValue: "Don’t: Hide Documents" }),
      text: t("slides.dont2.text", {
        defaultValue: "Give all relevant papers, even if incomplete.",
      }),
    },
  ];

  // Checklist: What to bring
  const checklist = [
    {
      id: "id-docs",
      icon: "🪪",
      title: t("checklist.id", { defaultValue: "Passport or ID" }),
      note: t("checklist.id_note", { defaultValue: "Bring any official documents you have." }),
    },
    {
      id: "asylum-docs",
      icon: "📄",
      title: t("checklist.asylum", { defaultValue: "Asylum documents" }),
      note: t("checklist.asylum_note", { defaultValue: "Proof of application, appointment letters." }),
    },
    {
      id: "evidence",
      icon: "📂",
      title: t("checklist.evidence", { defaultValue: "Evidence" }),
      note: t("checklist.evidence_note", { defaultValue: "Photos, medical reports, police reports." }),
    },
    {
      id: "interpreter",
      icon: "🎧",
      title: t("checklist.interpreter", { defaultValue: "Interpreter request" }),
      note: t("checklist.interpreter_note", { defaultValue: "Confirm interpreter in your language." }),
    },
  ];

  // Roleplay: Practice questions
  const roleplay = [
    {
      id: "q1",
      question: t("roleplay.q1", {
        defaultValue: "Why did you leave your country?",
      }),
    },
    {
      id: "q2",
      question: t("roleplay.q2", {
        defaultValue: "Do you fear going back? Why?",
      }),
    },
    {
      id: "q3",
      question: t("roleplay.q3", {
        defaultValue: "What happened to you on your journey?",
      }),
    },
    {
      id: "q4",
      question: t("roleplay.q4", {
        defaultValue: "Who are your family members here or abroad?",
      }),
    },
  ];

  return (
    <InterviewPrepTemplate
      translationNamespace="asylumInterview"
      steps={steps}
      slides={slides}
      checklist={checklist}
      roleplay={roleplay}
    />
  );
}
