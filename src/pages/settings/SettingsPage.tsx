import PageGrid from 'components/redesign/page-grid/PageGrid';
import TabsContent from './components/common/TabsContent';
import React from 'react';
import { Box } from '@chakra-ui/react';
import SaveChangesDrawer from './components/common/SaveChangesDrawer';

function SettingsPage() {
    return (
        <PageGrid.Root flexProps={{ overflowX: "hidden" }}>
            <Box mx={6} mt={6}>
                <PageGrid.Header title='Settings' description='Customize the platform to your Preferences' />
            </Box>
            <TabsContent />
            <SaveChangesDrawer />
        </PageGrid.Root>
    );
}

export default SettingsPage;