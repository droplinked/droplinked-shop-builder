import { LegalUsageKey } from "services/subscription/interfaces";

const permissionMessages = {
  permissionDenied: "Permission Denied",
  maxActiveLoginMethods: (count: string) => {
    const num = Number(count);
    return `You can only activate up to ${num} login method${num !== 1 ? "s" : ""}`;
  },
  maxActivePaymentMethods: (count: string) => {
    const num = Number(count);
    return `You can only activate up to ${num} payment method${num !== 1 ? "s" : ""}`;
  },
  subscriptionDataUnavailable:
    "Oops! It looks like we cannot access subscription data at the moment. Give it another try soon?",
  productCreationLimitReached: (key: LegalUsageKey) => {
    const titles = {
      digital_product: "Digital Product",
      print_on_demand: "Print on Demand",
      physical_product: "Physical Product",
      event: "Event",
      drop: "Drop",
    };
    const title = titles[key];
    return `${title} creation limit reached. Consider upgrading your plan to create more.`;
  },
  dropLimitReached:
    "Drop limit reached. Consider upgrading your plan to drop more.",
};

export default permissionMessages;
