import React from "react";
import { TFunction } from "i18next";
import { getSubscriptionPlans } from "data/subscriptionPlans";
import {
    PlanType,
    UpgradePlanTexts,
    PlanInfo,
} from "../types/upgradePlan.types";
import { PLAN_TYPE_MAP } from "../constants";

export function getUpgradePlanTexts(
    activeTab: PlanType,
    isCrossmint: boolean,
    canActivateTrial: boolean,
    t: TFunction
): UpgradePlanTexts {
    const isEnterprise = activeTab === "enterprise";

    return {
        title: isCrossmint
            ? t("UpgradePlanModal.ModalHeader.crossmintTitle")
            : isEnterprise
            ? t("UpgradePlanModal.ModalHeader.enterpriseTitle")
            : canActivateTrial
            ? t("UpgradePlanModal.ModalHeader.trialTitle")
            : t("UpgradePlanModal.ModalHeader.upgradeTitle"),

        description: isCrossmint
            ? t("UpgradePlanModal.ModalHeader.crossmintDescription")
            : isEnterprise
            ? t("UpgradePlanModal.ModalHeader.enterpriseDescription")
            : canActivateTrial
            ? t("UpgradePlanModal.ModalHeader.trialDescription")
            : t("UpgradePlanModal.ModalHeader.upgradeDescription", {
                  activeTab,
              }),

        saveButtonText: isEnterprise
            ? t("UpgradePlanModal.ModalFooter.requestMeeting")
            : isCrossmint
            ? t("common:continue")
            : canActivateTrial
            ? t("UpgradePlanModal.ModalFooter.claimTrial")
            : t("UpgradePlanModal.ModalFooter.upgrade"),

        discardButtonText: isEnterprise
            ? t("UpgradePlanModal.ModalFooter.notNow")
            : !canActivateTrial
            ? t("UpgradePlanModal.ModalFooter.keepCurrentPlan")
            : t("common:close"),
    };
}

export function getDurationName(months: number): string {
    switch (months) {
        case 1:
            return "Monthly";
        case 12:
            return "Annually";
        case 36:
            return "3-Year";
        default:
            return `${months} Month${months > 1 ? "s" : ""}`;
    }
}

export function getPlanInfo(planType: PlanType, t: TFunction): PlanInfo {
    const subscriptionPlans = getSubscriptionPlans(t);
    const planKey = PLAN_TYPE_MAP[planType] as keyof typeof subscriptionPlans;
    const plan = subscriptionPlans[planKey] || subscriptionPlans.BUSINESS;

    return {
        icon: React.createElement(plan.icon, { color: "white" }),
        title: plan.title,
        description: plan.description,
        features: plan.features.items,
    };
}

export function getCurrentPlanData(activeTab: PlanType, t: TFunction) {
    const subscriptionPlans = getSubscriptionPlans(t);
    const planKey = PLAN_TYPE_MAP[activeTab] as keyof typeof subscriptionPlans;
    const plan = subscriptionPlans[planKey] || subscriptionPlans.BUSINESS;

    return {
        plan: {
            _id: plan.type,
            type: plan.type,
            subOptionIds: [],
            price: "0",
        },
        features: plan.features.items,
    };
}

export function getPlanForPayment(activeTab: PlanType): string {
    return activeTab === "pro" ? "BUSINESS" : "BUSINESS_PRO";
}
