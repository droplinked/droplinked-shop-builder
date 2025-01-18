import { Box, Flex, ModalBody } from "@chakra-ui/react";
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
    console.log(paymentMethodsData)
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
        <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "xxl" }} modalContentProps={{ p: 0, background: "#141414" }}>
            <ModalHeaderData
                backgroundColor="#141414"
                icon={
                    <ModalHeaderIconWrapper>
                        <AppIcons.DollarSign />
                    </ModalHeaderIconWrapper>
                }
                modalHeaderProps={{ padding: "0px", paddingBlock: "0px", style: { paddingInline: "36px" } }}
                title={"Tokens"}
                description="Select token options you want to use for payments."
            />
            <ModalBody maxHeight={"60dvh"} display={"flex"} gap={9} flexDir={"column"}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Input
                        leftElement={<AppIcons.Search />}
                        rightElement={
                            <Box borderRadius={"4px"} bg={"#292929"} p={1}>
                                <AppIcons.Slash />
                            </Box>
                        }
                        inputContainerProps={{ width: "300px" }}
                        inputProps={{ placeholder: "Search", onChange: handleSearchChange }}
                    />
                    <Select items={[allNetworksItem, ...paymentMethodsData]} labelAccessor="type" valueAccessor="type" selectProps={{ width: "200px", onChange: handleFilterData }} />
                </Flex>
                <TokensListContainer isEvm tokens={filteredPaymentMethods} />
                <TokensListContainer tokens={filteredPaymentMethods} />
            </ModalBody>
        </AppModal>
    );
}
