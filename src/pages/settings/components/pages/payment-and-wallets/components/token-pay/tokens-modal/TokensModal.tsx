import { Flex, ModalBody, useMediaQuery } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AppInput from "components/redesign/input/AppInput";
import AppModal from "components/redesign/modal/AppModal";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import AppSelect from "components/redesign/select/AppSelect";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React, { ChangeEvent, useEffect } from "react";
import { IPaymentPublicService } from "services/shop/interfaces";
import TokensListContainer from "./TokensListContainer";

interface Props {
    paymentMethodsData: IPaymentPublicService[];
    isOpen: boolean;
    onClose: () => void;
}

export default function TokensModal({ paymentMethodsData, isOpen, onClose }: Props) {
    const { t } = useLocaleResources('settings');
    const allNetworksItem = { type: t('PaymentsWallets.tokens.allNetworks') };
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [filteredPaymentMethods, setFilteredPaymentMethods] = React.useState<IPaymentPublicService[]>([]);
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        const filteredData = paymentMethodsData.filter((item) =>
            item.type?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPaymentMethods(filteredData);
    }, [paymentMethodsData, searchTerm]);

    const handleFilterData = (e: ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        if (type === t('PaymentsWallets.tokens.allNetworks')) {
            setFilteredPaymentMethods(paymentMethodsData);
        } else {
            const filteredData = paymentMethodsData.filter((item) => item.type?.toLowerCase().includes(type.toLowerCase()));
            setFilteredPaymentMethods(filteredData);
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "xxl", isCentered: true }}
            modalContentProps={{ gap: 0, paddingBlock: 0, paddingBottom: "48px" }}
        >
            <ModalHeaderData
                {...!isSmallerThan768 && { icon: <AppIcons.DollarSign /> }}
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
                title={t('PaymentsWallets.tokens.title')}
                description={t('PaymentsWallets.tokens.description')}
            />
            <ModalBody maxHeight={"60dvh"} display={"flex"} gap={9} flexDir={"column"}>
                <Flex py={{ base: "24px", md: "48px" }} flexDirection={{ base: "column", md: "row" }}
                    gap={4}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <AppInput
                        leftElement={<AppIcons.Search />}
                        inputGroupProps={{ width: { base: "100%", md: "300px" } }}
                        inputProps={{ placeholder: t('search'), onChange: handleSearchChange }}
                    />
                    <AppSelect
                        itemColor="neutral.white"
                        itemBackgroundColor="#1a202c"
                        items={[allNetworksItem, ...paymentMethodsData]}
                        labelAccessor="type"
                        valueAccessor="type"
                        selectProps={{ width: { base: "100%", md: "200px" }, onChange: handleFilterData, color: "neutral.white" }}
                    />
                </Flex>
                <TokensListContainer isEvm tokens={filteredPaymentMethods} />
                <TokensListContainer tokens={filteredPaymentMethods} />
            </ModalBody>
        </AppModal>
    );
}
