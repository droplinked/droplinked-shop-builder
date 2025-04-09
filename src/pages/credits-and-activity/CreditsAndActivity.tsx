import { Box } from "@chakra-ui/react";
import PageGrid from "components/redesign/page-grid/PageGrid";
import React, { useEffect } from "react";
import TabsContent from "./components/TabsContent";
import useCreditStore from "./stores/CreditStore";

export default function CreditsAndActivity() {
    const { resetCreditState } = useCreditStore()

    useEffect(() => {
        return () => {
            resetCreditState();
        }
    }, [])

    return (
        <PageGrid.Root flexProps={{ overflowX: "hidden", padding: 0 }}>
            <PageGrid.Header title="Credits and Account Activity" description="Manage account credits and review onchain activity." />
            <TabsContent />
        </PageGrid.Root>
    );
}
