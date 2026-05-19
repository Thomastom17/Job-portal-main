import React from "react";

export const MembershipPlanSchema = [
  {
    tierType: "Tier1Plan",
    planName: "Basic Employer Plan",
    planType: "Starter Plan",
    description: "A basic plan for small businesses starting out...",
    price: "0",
    billingCycle: "Monthly",
    duration: "30",
    discount: "5",
    tax: "18",
    planStatus: "Active",
    features: [
      { id: 1, label: "Number Of Jobs Post", val: "10", active: true },
      { id: 2, label: "Featured Job Listings", val: "1", active: true },
      { id: 3, label: "Resume Access Limit", val: "20", active: true },
      { id: 4, label: "Applicant View Limit", val: "20", active: true },
      { id: 5, label: "Priority Support", val: "No", active: false },
    ],
    isDefault: true,
    isTrialEnabled: false,
    TrailDuration: "0",
    GraceTime: "",
    planTags: ["Starter"],
    isAutoRenewal: false
  },
  {
    tierType: "Tier2Plan",
    planName: "Professional Employer Plan",
    planType: "Growth Plan",
    description: "An intermediate plan for growing companies...",
    price: "499",
    billingCycle: "Half-Yearly",
    duration: "180",
    discount: "8",
    tax: "18",
    planStatus: "Active",
  
    features: [
      { id: 1, label: "Number Of Jobs Post", val: "50", active: true },
      { id: 2, label: "Featured Job Listings", val: "3", active: true },
      { id: 3, label: "Resume Access Limit", val: "60", active: true },
      { id: 4, label: "Applicant View Limit", val: "60", active: true },
      { id: 5, label: "Priority Support", val: "Yes", active: true }
    ],
    isDefault: false,
    isTrialEnabled: true,
    TrailDuration: "5",
    GraceTime: "2",
    planTags: ["Popular"],
    isAutoRenewal: true
  },
  {
    tierType: "Tier3Plan",
    planName: "Premier Employer Plan",
    planType: "Professional Plan",
    description: "A premium plan for employers looking for full scale recruitment...",
    price: "999",
    billingCycle: "Yearly",
    duration: "364",
    discount: "10",
    tax: "18",
    planStatus: "Active",

    features: [
      { id: 1, label: "Number Of Jobs Post", val: "100", active: true },
      { id: 2, label: "Featured Job Listings", val: "5", active: true },
      { id: 3, label: "Resume Access Limit", val: "100", active: true },
      { id: 4, label: "Applicant View Limit", val: "100", active: true },
      { id: 5, label: "Priority Support", val: "Yes", active: true }
    ],
    isDefault: false,
    isTrialEnabled: true,
    TrailDuration: "7",
    GraceTime: "",
    planTags: ["Recommended"],
    isAutoRenewal: true
  }
];