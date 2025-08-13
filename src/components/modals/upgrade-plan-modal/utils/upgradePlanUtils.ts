export function getUpgradePlanTexts(
    activeTab: string,
    isCrossmint: boolean,
    canActivateTrial: boolean,
    t: (key: string, options?: any) => string
) {
    const isEnterprise = activeTab === 'enterprise';
    return {
        // Header texts
        title: isCrossmint
            ? t('proPlan.crossmint.title')
            : isEnterprise
                ? t('proPlan.enterprise.title')
                : canActivateTrial
                ? t('proPlan.trial.title')
                : t('proPlan.upgrade.title'),

        description: isCrossmint
            ? t('proPlan.crossmint.description')
            : isEnterprise
                ? t('proPlan.enterprise.description')
            : canActivateTrial
                ? t('proPlan.trial.description')
                : t('proPlan.upgrade.description', { activeTab }),

        // Button texts
        saveButtonText: isEnterprise
            ? t('proPlan.footer.requestMeeting')
            : isCrossmint
                ? t('proPlan.footer.continue')
                : canActivateTrial
                    ? t('proPlan.footer.claimTrial')
                    : t('proPlan.footer.upgrade'),

        discardButtonText: isEnterprise
            ? t('proPlan.footer.notNow')
            : !canActivateTrial
                ? t('proPlan.footer.keepCurrentPlan')
                : t('proPlan.footer.close')
    };
}
