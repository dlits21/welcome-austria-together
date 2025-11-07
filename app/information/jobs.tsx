import React from 'react';
import InformationPageTemplate from '../../components/InformationPageTemplate';

const prominentTopics = [
  {
    key: "work-permit-eligibility",
    icon: "verified-user",
    color: "#4CAF50",
    route: "/information/jobs/work-permit-eligibility"
  },
  {
    key: "permits-guide",
    icon: "description",
    color: "#2196F3",
    route: "/information/jobs/permits-guide"
  },
  {
    key: "worker-rights",
    icon: "security",
    color: "#FF9800",
    route: "/information/jobs/worker-rights"
  },
  {
    key: "verified-employers",
    icon: "business",
    color: "#9C27B0",
    route: "/information/jobs/verified-employers"
  },
  {
    key: "job-search",
    icon: "work",
    color: "#607D8B",
    route: "/information/jobs/job-search"
  }
];

const secondaryTopics = [
  {
    key: "contract-templates",
    icon: "article",
    color: "#795548",
    route: "/information/jobs/contract-templates"
  },
  {
    key: "exploitation-report",
    icon: "report-problem",
    color: "#F44336",
    route: "/information/jobs/exploitation-report"
  },
  {
    key: "health-safety",
    icon: "health-and-safety",
    color: "#4CAF50",
    route: "/information/jobs/health-safety"
  },
  {
    key: "taxes-payroll",
    icon: "account-balance",
    color: "#3F51B5",
    route: "/information/jobs/taxes-payroll"
  },
  {
    key: "specific-groups",
    icon: "groups",
    color: "#E91E63",
    route: "/information/jobs/specific-groups"
  },
  {
    key: "discrimination",
    icon: "balance",
    color: "#FF5722",
    route: "/information/jobs/discrimination"
  },
  {
    key: "skills-training",
    icon: "school",
    color: "#00BCD4",
    route: "/information/jobs/skills-training"
  },
  {
    key: "informal-work",
    icon: "warning",
    color: "#FFC107",
    route: "/information/jobs/informal-work"
  },
  {
    key: "unions-support",
    icon: "group",
    color: "#8BC34A",
    route: "/information/jobs/unions-support"
  },
  {
    key: "employer-vetting",
    icon: "fact-check",
    color: "#673AB7",
    route: "/information/jobs/employer-vetting"
  }
];

export default function Jobs() {
  return (
    <InformationPageTemplate
      prominentTopics={prominentTopics}
      secondaryTopics={secondaryTopics}
      translationNamespace="jobs"
      tutorialData="jobs"
      emergencyRoute="/ask/emergency"
      primaryHeight={440}
      height={460}
    />
  );
}