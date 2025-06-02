import { Table, TableContainer } from '@chakra-ui/react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { getTableData } from 'pages/subscription-plans/data/tableData';
import * as React from 'react';
import { SubscriptionPlan } from 'services/subscription/interfaces';
import PlansHeading from './PlansHeading';
import PlansTableBody from './PlansTableBody';

function PlansTableContainer({ data }: { data: Array<SubscriptionPlan> }) {
    const { t } = useLocaleResources('subscription');
    const tableData = getTableData(t);
    
    return (
        <>
            <TableContainer>
                <Table variant={"simple"}>
                    <PlansHeading data={data} />
                    <PlansTableBody data={tableData.data} />
                </Table>
            </TableContainer>
        </>
    );
}

export default PlansTableContainer;