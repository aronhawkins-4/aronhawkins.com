export interface MaintenancePlan {
  name: string;
  description: string;
  includes: string[];
}

export interface MaintenanceRate {
  price: string;
  period?: string;
  note?: string;
}

export interface MaintenancePrice {
  name: string;
  hourly: MaintenanceRate;
  retainer: MaintenanceRate;
}

export type BillingOption = "hourly" | "retainer";

export const maintenancePlans: MaintenancePlan[] = [
  {
    name: "App Maintenance",
    description:
      "Support for web and mobile apps, so you and your users always get a stable, secure experience.",
    includes: [
      "Bug fixes & indicident triaging",
      "Security enhancements",
      "Performance optimization",
      "Feature improvements & additions",
      "Technical support",
      "Dependency upgrades",
      "Quality assurance",
      "Database backups and health checks",
    ],
  },
  {
    name: "Site Maintenance",
    description:
      "Keep your site fast, secure, and current without having to become a developer yourself.",
    includes: [
      "CMS, plugin, and dependency updates",
      "Security monitoring",
      "Performance optimization",
      "Content updates",
      "Technical support",
      "Accessibility improvements",
      "Domain & hosting configuration",
      "Analytics & 3rd-party integrations",
    ],
  },
];

// TODO: placeholder pricing — replace with real rates before launch.
export const retainerDiscount = "15%";

export const billingNotes: Record<BillingOption, string> = {
  hourly: "For one-time improvements, bug fixes, and security patches.",
  retainer: "For ongoing support. Billed in 3-month intervals.",
};

export const maintenancePricing: MaintenancePrice[] = [
  {
    name: "5 Hours",
    hourly: {
      price: "$750",
      //   period: "/ hour",
      //   note: "Updates and edits as you need them, billed in 15-minute increments.",
    },
    retainer: {
      price: "$750",
      period: "/ month",
      //   note: "Includes up to X hours of updates and edits each month.",
    },
  },
  {
    name: "10 Hours",
    hourly: {
      price: "$1,500",
      //   period: "/ hour",
      //   note: "Fixes and updates as you need them, billed in 15-minute increments.",
    },
    retainer: {
      price: "$1,350",
      period: "/ month",
      //   note: "Includes up to X hours of fixes and updates each month.",
    },
  },
  {
    name: "20 Hours",
    hourly: {
      price: "$3,000",
      //   period: "/ hour",
      //   note: "One rate for work across your app and site.",
    },
    retainer: {
      price: "$2,550",
      period: "/ month",
      //   note: "Full coverage for your app and site at a discounted rate.",
    },
  },
];
