import PageGrid from 'components/redesign/page-grid/PageGrid';
import * as React from 'react';
import TabsContainer from './components/TabsContainer';
import { Outlet } from 'react-router-dom';

function SettingsPageWrapper() {

    return (
        <PageGrid.Root>
            <PageGrid.Header flexProps={{ marginBottom: "24px" }} title='Settings' description='Customize the platform to your Preferences' />
            <TabsContainer />
            <Outlet />
        </PageGrid.Root>
    );
}

export default SettingsPageWrapper;