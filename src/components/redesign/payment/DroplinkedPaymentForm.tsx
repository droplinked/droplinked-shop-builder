import React from "react";
import { Box } from "@chakra-ui/react";
import { DroplinkedPaymentIntent } from "droplinked-payment-intent";
import { appDevelopment } from "utils/app/variable";

interface DroplinkedPaymentFormProps {
    clientSecret: string;
    intentType: "payment" | "setup";
    onSuccess: () => void;
    onError: (error?: any) => void;
    onCancel: () => void;
    containerStyles?: React.CSSProperties;
}

const DroplinkedPaymentForm: React.FC<DroplinkedPaymentFormProps> = ({
    clientSecret,
    intentType,
    onSuccess,
    onError,
    onCancel,
    containerStyles,
}) => {
    return (
        <Box sx={containerStyles}>
            <DroplinkedPaymentIntent
                clientSecret={clientSecret}
                intentType={intentType}
                type="stripe"
                isTestnet={appDevelopment}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
                commonStyle={{
                    backgroundBody: "#1C1C1C",
                    colorContainer: "#1C1C1C",
                    textColorLabel: "#fff",
                    colorInput: "#1C1C1C",
                    textColorInput: "#fff",
                    colorBorderInput: "#292929",
                    borderRadius: "8px",
                    cancelButton: {
                        backgroundColor: "#292929",
                        borderRadius: "8px",
                        textColor: "#fff",
                    },
                    submitButton: {
                        backgroundColor: "#2BCFA1",
                        borderRadius: "8px",
                        textColor: "#000",
                    },
                    verticalPadding: "1rem",
                    theme: "dark",
                }}
            />
        </Box>
    );
};

export default DroplinkedPaymentForm;
