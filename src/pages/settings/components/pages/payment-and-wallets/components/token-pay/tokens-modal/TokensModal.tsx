import { Flex, ModalBody } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import Input from "components/redesign/input/Input";
import ModalHeaderIconWrapper from "components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper";
import AppModal from "components/redesign/modal/AppModal";
import ModalHeaderData from "components/redesign/modal/ModalHeaderData";
import Select from "components/redesign/select/Select";
import { IPaymentPublicService } from "lib/apis/shop/interfaces";
import React, { ChangeEvent, useEffect } from "react";
import TokensListContainer from "./TokensListContainer";

interface Props {
    paymentMethodsData: IPaymentPublicService[];
    isOpen: boolean;
    onClose: () => void;
}

export default function TokensModal({ paymentMethodsData, isOpen, onClose }: Props) {
    const allNetworksItem = { type: "All Networks" };
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [filteredPaymentMethods, setFilteredPaymentMethods] = React.useState<IPaymentPublicService[]>([]);

    useEffect(() => {
        const filteredData = paymentMethodsData.filter((item) =>
            item.type?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPaymentMethods(filteredData);
    }, [paymentMethodsData, searchTerm]);

    const handleFilterData = (e: ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        if (type === "All Networks") {
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
                icon={
                    <ModalHeaderIconWrapper>
                        <AppIcons.DollarSign />
                    </ModalHeaderIconWrapper>
                }
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
                descriptionColor="#B1B1B1 !important"
                title={"Tokens"}
                description="Select token options you want to use for payments."
            />
            <ModalBody maxHeight={"60dvh"} display={"flex"} gap={9} flexDir={"column"}>
                <Flex py={{ base: "24px", md: "48px" }} flexDirection={{ base: "column", md: "row" }}
                    gap={4}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Input
                        leftElement={<AppIcons.Search />}
                        inputGroupProps={{ width: { base: "100%", md: "300px" } }}
                        inputProps={{ placeholder: "Search", onChange: handleSearchChange }}
                    />
                    <Select
                        itemColor="#fff"
                        itemBackgroundColor="#1a202c"
                        items={[allNetworksItem, ...paymentMethodsData]}
                        labelAccessor="type"
                        valueAccessor="type"
                        selectProps={{ width: { base: "100%", md: "200px" }, onChange: handleFilterData, color: "#fff" }}
                    />
                </Flex>
                <TokensListContainer isEvm tokens={filteredPaymentMethods} />
                <TokensListContainer tokens={filteredPaymentMethods} />
            </ModalBody>
        </AppModal>
    );
}
