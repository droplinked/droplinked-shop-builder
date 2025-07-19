import PageGrid from "components/redesign/page-grid/PageGrid"
import React, { useEffect } from "react"
import TabsContent from "./components/TabsContent"
import useCreditStore from "./stores/CreditStore"
import enLocale from "locales/credit-and-activity/en.json"
import arLocale from "locales/credit-and-activity/ar.json"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"

export default function CreditsAndActivity() {
    const { t } = useLocaleResources("creditsAndActivity", {
        en: enLocale,
        ar: arLocale
    })
    const { resetCreditState } = useCreditStore()

    useEffect(() => {
        return () => {
            resetCreditState()
        }
    }, [])

    return (
        <PageGrid.Root>
            <PageGrid.Header title={t("CreditsAndActivity.title")} description={t("CreditsAndActivity.subtitle")} />
            <TabsContent />
        </PageGrid.Root>
    )
}
