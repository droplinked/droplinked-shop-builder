import { Flex, Image, Spinner, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import useAppStore from "lib/stores/app/appStore";
import { currencyConvertion } from "lib/utils/helpers/currencyConvertion";
import React, { useState } from "react";
import AddBalanceModal from "./add-balance-modal/AddBalanceModal";
import useAppToast from "functions/hooks/toast/useToast";
import BlueButton from "components/redesign/button/BlueButton";

export default function Balance() {
    const { shop: { currency, credit, name }, fetchShop } = useAppStore();
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { showToast } = useAppToast()
    const [loading, setLoading] = useState(false);
    const handleRefetchShop = async () => {
        setLoading(true);
        try {
            await fetchShop({ shopName: name });
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
            border={"1px solid #292929"}
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
                    <AppIcons.Refresh />
                    Charge
                </BlueButton>
            </Flex>
            {loading ?
                <Spinner color="white" />
                :
                <AppTypography fontSize={"16px"} color={"#fff"} sx={{ span: { color: "#7B7B7B" } }}>
                    {currency?.symbol}{" "}
                    {currencyConvertion(credit, currency?.conversionRateToUSD, false)}{" "}
                    <span>{currency?.abbreviation}</span>
                </AppTypography>
            }
            <AddBalanceModal handleRefetchShop={handleRefetchShop} isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}
