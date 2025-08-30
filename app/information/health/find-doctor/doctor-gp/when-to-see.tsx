import React from "react";
import { useTranslation } from "react-i18next";
import DecisionTemplate from "../../../../../components/DecisionTemplate";

export default function WhenToSeeGP() {
  const { t } = useTranslation("doctorGP");

  // Transform the slides object to array format expected by DecisionTemplate
  const slidesData = t("whenToSee.slides", { returnObjects: true }) as Record<string, any>;
  const slides = Object.entries(slidesData).map(([key, slide]) => ({
    key,
    ...slide
  }));

  const extraInfoData = t("whenToSee.extraInfo", { returnObjects: true }) as Record<string, any>;
  const extraInfo = {
    title: "More Information",
    sections: Object.values(extraInfoData).map((section: any) => ({
      icon: section.icon, // Extract emoji from title
      heading: section.title.replace(/^.+ /, ""), // Remove emoji from title
      text: Array.isArray(section.content) ? section.content.join(". ") : section.content
    }))
  };

  return <DecisionTemplate
            translationNamespace="doctorGP"
            slides={slides}
            startKey="start"
            extraInfo={extraInfo} />;
}
