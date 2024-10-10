import { createContext } from "react";
import { IUpdateStates } from "types/interface";

export type D3StepsType = "connect" | "loading" | "error" | "done";
export interface ID3States {
    currentStep: D3StepsType;
}
export const initialD3States: ID3States = { currentStep: "connect" };
interface ID3Context {
    states: ID3States;
    methods: { updateStates: ({ key, value }: IUpdateStates<ID3States>) => void };
}

const D3Context = createContext<ID3Context>({
    states: { currentStep: "connect" },
    methods: { updateStates: () => {} },
});

export default D3Context;
