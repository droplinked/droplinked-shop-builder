import { Box, Skeleton, VStack } from '@chakra-ui/react';
import * as React from 'react';
import TableHeading from './_components/TableHeading';
import { useQuery } from 'react-query';
import { getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices';
import PlansTableContainer from './_components/plans-component/PlansTableContainer';

function PlansTable() {
    const { isFetching, data } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getSubscriptionPlansService()
    })
    if (isFetching) {
        return <Skeleton />
    }
    return (
        <VStack overflow={"auto"} display={{ md: "none", lg: "flex" }} >
            <TableHeading />
            <Box overflow="auto" width="100%">
                <PlansTableContainer data={data.data} />
            </Box>
        </VStack>
    );
}

export default PlansTable;