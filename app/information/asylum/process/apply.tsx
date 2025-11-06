import React from "react";
import { useTranslation } from "react-i18next";
import SlidesTemplate from "../../../../components/SlidesTemplate";

const getAudioPath = () => {
  try {
    return require("../../../../assets/audio/asylum-apply.mp3");
  } catch {
    return undefined;
  }
};

export default function AsylumApply() {
  const { t } = useTranslation("asylum-apply");

  const slides = [
    {
      id: "register",
      number: 1,
      title: t("steps.register_title", { defaultValue: "Register your asylum application" }),
      route: "/information/asylum/process/apply/register",
      navigationType: 'slides' as const,
      slideData: {
        subtitle: t("steps.register_desc", { defaultValue: "Go to the asylum office or border authority to register your application." }),
        imagePath: require("../../../../assets/images/Images/refugee_rights.jpg"),
        imagePosition: 'right' as const,
        slideContent: [
          {
            number: 1,
            text: t("steps.register_content_1", { defaultValue: "Visit the designated asylum office or border point" })
          },
          {
            number: 2,
            text: t("steps.register_content_2", { defaultValue: "Bring your identification documents if available" })
          },
          {
            number: 3,
            text: t("steps.register_content_3", { defaultValue: "Complete the initial registration form" })
          }
        ]
      }
    },
    {
      id: "submit",
      number: 2,
      title: t("steps.submit_title", { defaultValue: "Submit required documents" }),
      route: "/information/asylum/process/apply/submit",
      navigationType: 'slides' as const,
      slideData: {
        subtitle: t("steps.submit_desc", { defaultValue: "Fill out the official asylum form. You may need help from a translator or NGO." }),
        imagePath: require("../../../../assets/images/Images/refugee_rights.jpg"),
        imagePosition: 'left' as const,
        slideContent: [
          {
            number: 1,
            text: t("steps.submit_content_1", { defaultValue: "Gather all relevant documents and evidence" })
          },
          {
            number: 2,
            text: t("steps.submit_content_2", { defaultValue: "Complete the asylum application form accurately" })
          },
          {
            number: 3,
            text: t("steps.submit_content_3", { defaultValue: "Submit all documents to the asylum office" })
          }
        ]
      }
    },
    {
      id: "interview",
      number: 3,
      title: t("steps.interview_title", { defaultValue: "Attend asylum interview" }),
      route: "/information/asylum/process/apply/interview",
      navigationType: 'slides' as const,
      slideData: {
        subtitle: t("steps.interview_desc", { defaultValue: "You will be asked about your story and reasons for seeking asylum. Be honest and detailed." }),
        imagePath: require("../../../../assets/images/Images/refugee_rights.jpg"),
        imagePosition: 'right' as const,
        slideContent: [
          {
            number: 1,
            text: t("steps.interview_content_1", { defaultValue: "Prepare your story and supporting evidence" })
          },
          {
            number: 2,
            text: t("steps.interview_content_2", { defaultValue: "Answer all questions truthfully and in detail" })
          },
          {
            number: 3,
            text: t("steps.interview_content_3", { defaultValue: "Request a translator if needed" })
          }
        ]
      }
    },
    {
      id: "decision",
      number: 4,
      title: t("steps.decision_title", { defaultValue: "Await decision" }),
      route: "/information/asylum/process/apply/decision",
      navigationType: 'slides' as const,
      slideData: {
        subtitle: t("steps.decision_desc", { defaultValue: "The authorities will decide whether your application is accepted or rejected. If rejected, you can appeal." }),
        imagePath: require("../../../../assets/images/Images/refugee_rights.jpg"),
        imagePosition: 'left' as const,
        slideContent: [
          {
            number: 1,
            text: t("steps.decision_content_1", { defaultValue: "Wait for the official decision notification" })
          },
          {
            number: 2,
            text: t("steps.decision_content_2", { defaultValue: "Review the decision carefully" })
          },
          {
            number: 3,
            text: t("steps.decision_content_3", { defaultValue: "Seek legal advice if your application is rejected" })
          }
        ]
      }
    },
    {
      id: "summary",
      number: 5,
      title: t("steps.summary", { defaultValue: "Summary" }),
      route: "/information/asylum/process/apply/summary"
    }
  ];

  return (
    <SlidesTemplate
      translationNamespace="asylum-apply"
      title={t("pageTitle", { defaultValue: "How to Apply for Asylum" })}
      helperText={t("helperText", { defaultValue: "Click the buttons." })}
      slides={slides}
      imagePath={require("../../../../assets/images/Images/refugee_rights.jpg")}
      homePath="/home"
      audioText={t("audioText", { defaultValue: "Welcome to the asylum application process. Follow these steps to complete your application." })}
      audioSource={getAudioPath()}
      tutorialContent={t("tutorialContent", { defaultValue: "This guide will walk you through each step of the asylum application process. Click on each step to learn more." })}
      badgeText={t("badgeText", { defaultValue: "A1" })}
      colorPalette={{
        primary: "#7c3aed",
        secondary: "#a78bfa",
        accent: "#c4b5fd"
      }}
    />
  );
}
