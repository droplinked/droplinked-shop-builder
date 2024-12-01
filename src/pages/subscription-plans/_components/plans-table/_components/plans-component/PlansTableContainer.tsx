import { Table, TableContainer } from '@chakra-ui/react';
import * as React from 'react';
import PlansHeading from './PlansHeading';
import { SubscriptionPlan } from 'lib/apis/subscription/interfaces';
import PlansTableBody from './PlansTableBody';
import { tableData } from 'pages/subscription-plans/data/tableData';

function PlansTableContainer({ data }: { data: Array<SubscriptionPlan> }) {
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