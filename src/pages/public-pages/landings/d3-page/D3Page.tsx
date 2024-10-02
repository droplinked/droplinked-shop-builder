import React, { useState } from "react";
import D3AboveTheFoldSection from "./components/d3-above-the-fold/D3AboveTheFoldSection";
import D3CollaborationDetails from "./components/D3CollaborationDetails";
import D3CollaborationFeatures from "./components/D3CollaborationFeatures";
import D3Layout from "./components/D3Layout";
import D3Context, { ID3States, initialD3States } from "./context/d3.context";
import { IUpdateStates } from "types/interface";

function D3Page() {
    const [States, setStates] = useState<ID3States>(initialD3States);
    const updateStates = ({ key, value }: IUpdateStates<ID3States>) => setStates((prev) => ({ ...prev, [key]: value }));
    return (
        <D3Context.Provider value={{ states: States, methods: { updateStates } }}>
            <D3AboveTheFoldSection />
            <D3Layout>
                <D3CollaborationDetails />
                <D3CollaborationFeatures />
            </D3Layout>
        </D3Context.Provider>
    );
}

export default D3Page;
