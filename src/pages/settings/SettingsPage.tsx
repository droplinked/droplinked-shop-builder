import PageGrid from 'components/redesign/page-grid/PageGrid';
import TabsContent from './components/TabsContent';
import React from 'react';

function SettingsPage() {
    return (
        <PageGrid.Root>
            <PageGrid.Header flexProps={{ marginBottom: "24px" }} title='Settings' description='Customize the platform to your Preferences' />
            <TabsContent />
        </PageGrid.Root>
    );
}

export default SettingsPage;