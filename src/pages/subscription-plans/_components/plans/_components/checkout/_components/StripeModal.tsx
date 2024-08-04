import { Divider, Flex, Heading } from '@chakra-ui/react';
import AppStripe from 'components/common/stripe/AppStripe';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
    clientSecret: string;
    setPaymentStatus: Dispatch<SetStateAction<"success" | "error">>;
    close: () => void;
    isFromPlansPage?: boolean;
}

function StripeModal({ clientSecret, setPaymentStatus, close, isFromPlansPage }: Props) {
    const { logoutUser } = useProfile();

    const handleCloseModal = () => {
        isFromPlansPage && logoutUser();
        close();
    }

    return (
        <Flex direction={"column"} gap={5}>
            <Heading textAlign={"center"} fontSize={36} fontWeight={700} color={"primary"}>Payment Information</Heading>
            <Divider height={"1px"} borderColor={"#292929"} />
            <AppStripe
                clientSecret={clientSecret}
                cancel={handleCloseModal}
                onSuccess={() => setPaymentStatus("success")}
                onError={() => setPaymentStatus("error")}
            />
        </Flex>
    )
}

export default StripeModal