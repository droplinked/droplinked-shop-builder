import { Flex, Image, Spinner, useDisclosure, useTabsContext } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import useAppStore from "stores/app/appStore";
import React, { useState } from "react";
import AddBalanceModal from "components/redesign/add-balance-modal/AddBalanceModal";
import useAppToast from "hooks/toast/useToast";
import BlueButton from "components/redesign/button/BlueButton";
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice";
import { useQuery } from "react-query";
import { getShopCredit } from "services/shop/shopServices";

export default function Balance() {
    const { shop: { name }, fetchShop } = useAppStore();
    const { selectedIndex } = useTabsContext()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { showToast } = useAppToast()
    const [loading, setLoading] = useState(false);
    const { isFetching, data, refetch } = useQuery({
        queryKey: ["shop-remaining-balance", selectedIndex],
        queryFn: () => getShopCredit(),
        enabled: selectedIndex === 3,
        refetchOnMount: true,
    })
    const handleRefetchShop = async () => {
        setLoading(true);
        try {
            await fetchShop({ shopName: name });
            await refetch()
        }
        catch {
            showToast({ message: "Oops! Something went wrong", type: "error" })
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Flex
            gap={8}
            borderRadius={"8px"}
            bg={"rgba(28, 28, 28, 0.64)"}
            backdropFilter={"blur(16px)"}
            border={"1px solid"}
            borderColor="neutral.gray.800"
            flexDirection={"column"}
            p={4}
        >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Image
                    width={"32px"}
                    src="https://upload-file-droplinked.s3.amazonaws.com/f9d54d7454b232b915a90bbd7e3c75df6f2fb2a728bcd364daecca3feb61bb47.png"
                    alt="droplinked logo"
                />
                <BlueButton
                    fontSize={12}
                    fontWeight={500}
                    onClick={onOpen}
                    gap={1}
                    sx={{ path: { stroke: "#179EF8", width: "16px", height: "16px" } }}
                >
                    <AppIcons.Refresh color="#2BCFA1" />
                    Charge
                </BlueButton>
            </Flex>
            {(isFetching || loading) ?
                <Spinner color="white" />
                :
                <FormattedPrice price={data?.data?.data?.credit} />
            }
            <AddBalanceModal handleRefetch={handleRefetchShop} isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}
