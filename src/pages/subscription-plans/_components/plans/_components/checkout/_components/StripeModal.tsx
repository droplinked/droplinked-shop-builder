import { Divider, Flex, Heading } from '@chakra-ui/react';
import AppStripe from 'components/common/stripe/AppStripe';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
    clientSecret: string;
    setPaymentStatus: Dispatch<SetStateAction<"success" | "error">>;
    close: () => void;
}

function StripeModal({ clientSecret, setPaymentStatus, close }: Props) {
    return (
        <Flex direction={"column"} gap={5}>
            <Heading textAlign={"center"} fontSize={36} fontWeight={700} color={"primary"}>Payment Information</Heading>
            <Divider m={0} height={"1px"} borderColor={"#292929"} />
            <AppStripe
                clientSecret={clientSecret}
                cancel={close}
                onSuccess={() => setPaymentStatus("success")}
                onError={() => setPaymentStatus("error")}
            />
        </Flex>
    )
}

export default StripeModal