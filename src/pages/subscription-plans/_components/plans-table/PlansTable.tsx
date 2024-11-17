import { Skeleton, VStack } from '@chakra-ui/react';
import * as React from 'react';
import TableHeading from './_components/TableHeading';
import { useQuery } from 'react-query';
import { getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices';
import PlansTableContainer from './_components/plans/PlansTableContainer';

function PlansTable() {
    const { isFetching, isError, data } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getSubscriptionPlansService()
    })
    if (isFetching) {
        return <Skeleton />
    }
    return (
        <VStack>
            <TableHeading />
            <PlansTableContainer data={data.data} />
        </VStack>
    );
}

export default PlansTable;