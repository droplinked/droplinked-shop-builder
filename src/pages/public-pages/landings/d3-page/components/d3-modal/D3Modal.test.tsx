import React, { createContext } from "react";
import "@testing-library/jest-dom";
import D3Modal from "./D3Modal";
import D3Context, { D3StepsType } from "../../context/d3.context";
import { useDisclosure } from "@chakra-ui/react";
import { getNetworkProvider } from "lib/utils/chains/chainProvider";
import { render, screen, fireEvent, waitFor, } from "test-utils";

jest.mock("canvas", () => ({
    createCanvas: jest.fn(),
    loadImage: jest.fn(),
}));

// Mock dependencies
jest.mock("@chakra-ui/react", () => ({
    ...jest.requireActual("@chakra-ui/react"),
    useDisclosure: jest.fn(),
}));

jest.mock("lib/utils/chains/chainProvider", () => ({
    getNetworkProvider: jest.fn(),
}));

describe("D3Modal", () => {
    const mockUpdateStates = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnOpen = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useDisclosure as jest.Mock).mockReturnValue({
            isOpen: true,
            onClose: mockOnClose,
            onOpen: mockOnOpen,
        });
    });

    const renderWithContext = (currentStep: D3StepsType = "connect") => {
        return render(
            <D3Context.Provider
                value={{
                    states: { currentStep },
                    methods: { updateStates: mockUpdateStates },
                }}
            >
                <D3Modal />
            </D3Context.Provider>
        );
    };

    test("renders Claim Now button", () => {
        renderWithContext();
        expect(screen.getByText("Claim Now")).toBeInTheDocument();
    });

    test("opens modal when Claim Now button is clicked", () => {
        renderWithContext();
        fireEvent.click(screen.getByText("Claim Now"));
        expect(mockOnOpen).toHaveBeenCalled();
    });

    test("displays correct content for connect step", () => {
        renderWithContext("connect");
        fireEvent.click(screen.getByText("Claim Now"));
        expect(screen.getByText("Connect Wallet for Verification")).toBeInTheDocument();
        expect(screen.getByText("Check Wallet Eligibility")).toBeInTheDocument();
    });

    test("displays correct content for loading step", () => {
        renderWithContext("loading");
        fireEvent.click(screen.getByText("Claim Now"));
        expect(screen.getByText("Verifying Wallet Status")).toBeInTheDocument();
        expect(screen.getByText("Check Wallet Eligibility")).toBeInTheDocument();
    });

    test("displays correct content for error step", () => {
        renderWithContext("error");
        fireEvent.click(screen.getByText("Claim Now"));
        expect(screen.getByText("Wallet Verification Unsuccessful")).toBeInTheDocument();
        expect(screen.getByText("Return")).toBeInTheDocument();
    });

    test("displays correct content for done step", () => {
        renderWithContext("done");
        expect(screen.getByText("Congrats, Wallet Offer Verified")).toBeInTheDocument();
    });

    test("connects wallet when Check Wallet Eligibility is clicked", async () => {
        const mockWalletLogin = jest.fn().mockResolvedValue("success");
        (getNetworkProvider as jest.Mock).mockReturnValue({
            walletLogin: mockWalletLogin,
        });

        renderWithContext();
        fireEvent.click(screen.getByText("Claim Now"));

        fireEvent.click(screen.getByText("Check Wallet Eligibility"));

        await waitFor(() => {
            expect(mockUpdateStates).toHaveBeenCalledWith({ key: "currentStep", value: "loading" });
        });
        await waitFor(() => {
            expect(mockWalletLogin).toHaveBeenCalled();
        });
        await waitFor(() => {
            expect(mockUpdateStates).toHaveBeenCalledWith({ key: "currentStep", value: "done" });
        });
    });

    test("handles wallet connection error", async () => {
        const mockWalletLogin = jest.fn().mockRejectedValue(new Error("Connection failed"));
        (getNetworkProvider as jest.Mock).mockReturnValue({
            walletLogin: mockWalletLogin,
        });

        renderWithContext();
        fireEvent.click(screen.getByText("Claim Now"));

        fireEvent.click(screen.getByText("Check Wallet Eligibility"));

        await waitFor(() => {
            expect(mockUpdateStates).toHaveBeenCalledWith({ key: "currentStep", value: "loading" });
        });
        await waitFor(() => {
            expect(mockWalletLogin).toHaveBeenCalled();
        });
        await waitFor(() => {
            expect(mockUpdateStates).toHaveBeenCalledWith({ key: "currentStep", value: "error" });
        });
    });
});
