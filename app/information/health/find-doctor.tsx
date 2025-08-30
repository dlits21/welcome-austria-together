import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function FindDoctor() {
  const { t } = useTranslation("findDoctor");
  const router = useRouter();

  // Tiles explain the process in small, easy steps
  const tiles = [
      {
        key: "when-to-see",
        icon: "❓",
        title: t("doctor.tiles.when_title", { defaultValue: "When should I see a doctor?" }),
        sub: t("doctor.tiles.when_sub", { defaultValue: "Colds, injuries, pain – what’s urgent?" }),
        onPress: () => router.push("/information/healthcare/when-to-see-doctor"),
      },
    {
      key: "insurance",
      icon: "💳",
      title: t("doctor.tiles.insurance_title", { defaultValue: "Do I need insurance?" }),
      sub: t("doctor.tiles.insurance_sub", { defaultValue: "Most doctors require health insurance" }),
      onPress: () => router.push("/information/healthcare/doctor-insurance"),
    },
    {
      key: "gp",
      icon: "👩‍⚕️",
      title: t("doctor.tiles.gp_title", { defaultValue: "Family / GP doctor" }),
      sub: t("doctor.tiles.gp_sub", { defaultValue: "Your first contact for health issues" }),
      onPress: () => router.push("/information/healthcare/doctor-gp"),
    },
    {
      key: "walkin",
      icon: "🚶",
      title: t("doctor.tiles.walkin_title", { defaultValue: "Walk-in clinics" }),
      sub: t("doctor.tiles.walkin_sub", { defaultValue: "Places you can go without appointment" }),
      onPress: () => router.push("/information/healthcare/doctor-walkin"),
    },
    {
      key: "specialist",
      icon: "🩺",
      title: t("doctor.tiles.specialist_title", { defaultValue: "Specialist doctors" }),
      sub: t("doctor.tiles.specialist_sub", { defaultValue: "Referred by GP or direct access" }),
      onPress: () => router.push("/information/healthcare/doctor-specialist"),
    },
    {
      key: "children",
      icon: "👶",
      title: t("doctor.tiles.children_title", { defaultValue: "Pediatricians" }),
      sub: t("doctor.tiles.children_sub", { defaultValue: "Doctors for children & teens" }),
      onPress: () => router.push("/information/healthcare/doctor-children"),
    },
    {
      key: "hotlines",
      icon: "☎️",
      title: t("doctor.tiles.hotlines_title", { defaultValue: "Hotlines & directories" }),
      sub: t("doctor.tiles.hotlines_sub", { defaultValue: "Call for nearest open doctor" }),
      onPress: () => router.push("/information/contacts"),
    },
  ];

  // Official contacts & directories
  const contacts = [
    {
      name: t("doctor.contacts.national_hotline", { defaultValue: "National Health Hotline 1450" }),
      phone: "1450",
      subtitle: t("doctor.contacts.national_sub", { defaultValue: "Call for medical advice & nearest open doctor" }),
    },
    {
      name: t("doctor.contacts.directory", { defaultValue: "Online Doctor Directory" }),
      url: t("doctor.contacts.directory_url", { defaultValue: "https://www.arztsuche.at" }),
      subtitle: t("doctor.contacts.directory_sub", { defaultValue: "Search doctors by area and specialty" }),
    },
    {
      name: t("doctor.contacts.redcross", { defaultValue: "Red Cross health centers" }),
      url: t("doctor.contacts.redcross_url", { defaultValue: "https://www.roteskreuz.at" }),
      subtitle: t("doctor.contacts.redcross_sub", { defaultValue: "Walk-in clinics and first aid" }),
    },
    {
      name: t("doctor.contacts.ngo_name", { defaultValue: "NGO health advice" }),
      phone: t("doctor.contacts.ngo_phone", { defaultValue: "0800 111 222" }),
      subtitle: t("doctor.contacts.ngo_sub", { defaultValue: "Support for refugees without insurance" }),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="healthcare"
      videoId={t("exampleVideoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/information/contacts"
    />
  );
}
