import { Box } from "@chakra-ui/react";
import PageGrid from "components/redesign/page-grid/PageGrid";
import React from "react";

export default function CreditsAndActivity() {
    return (
        <PageGrid.Root flexProps={{ overflowX: "hidden" }}>
            <Box mx={6} mt={6}>
                <PageGrid.Header title="Credits and Account Activity" description="Manage account credits and review onchain activity." />
            </Box>

        </PageGrid.Root>
    );
}
