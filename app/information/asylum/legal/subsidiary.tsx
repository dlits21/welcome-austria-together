import React from "react";
import { useTranslation } from "react-i18next";
import StepPageTemplate from "../../../../components/StepPageTemplate";

export default function LegalSubsidiaryPage() {
  const { t } = useTranslation("asylumSubsidiaryStatus");

  const steps = [
    {
      id: "1",
      icon: "⏱️",
      title: t("temporary.title", { defaultValue: "Temporary Status" }),
      description: t("temporary.desc", { defaultValue: "Subsidiary protection is granted for one year and can be renewed if conditions in your home country remain dangerous." })
    },
    {
      id: "2", 
      icon: "💼",
      title: t("work.title", { defaultValue: "Limited Work Access" }),
      description: t("work.desc", { defaultValue: "You can work but may need additional permits for certain jobs. Access to employment programs may be restricted." })
    },
    {
      id: "3",
      icon: "🏥", 
      title: t("healthcare.title", { defaultValue: "Healthcare Access" }),
      description: t("healthcare.desc", { defaultValue: "You have access to essential healthcare services and emergency treatment." })
    },
    {
      id: "4",
      icon: "👥",
      title: t("family.title", { defaultValue: "Family Reunification" }),
      description: t("family.desc", { defaultValue: "Family reunification is possible but may take longer and have more restrictions than for refugees." })
    }
  ];

  const checklist = [
    t("checklist.renew", { defaultValue: "Remember to renew your status before expiry" }),
    t("checklist.documents", { defaultValue: "Keep all official documents safe and updated" }),
    t("checklist.legal", { defaultValue: "Seek legal advice if your situation changes" })
  ];

  return (
    <StepPageTemplate
      translationNamespace="asylumSubsidiaryStatus"
      steps={steps}
      videoId={t("videoUrl", { defaultValue: "Q607TYRBxFU" })}
      checklist={checklist}
    />
  );
}