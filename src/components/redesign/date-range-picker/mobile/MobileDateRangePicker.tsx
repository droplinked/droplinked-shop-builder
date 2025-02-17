import { TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Drawer from "components/common/Drawer/Drawer";
import React from "react";
import ControlButtons from "../components/ControlButtons";
import DatePicker from "../components/DatePicker";
import DateRangeFooter from "../components/DateRangeFooter";
import TabsList from "./TabsList";
import SideControls from "../components/SideControls";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props {
    isOpen: boolean;
    onClose: () => void;
    value: Value;
    tempValue: Value;
    onChange: (value: Value) => void;
    setTempValue: (value: Value) => void;
}

export default function MobileDateRangePicker({ isOpen, onClose, value, tempValue, onChange, setTempValue }: Props) {
    const tabs = [
        {
            title: "Filters",
            content: <SideControls setTempValue={setTempValue} />,
        },
        {
            title: "Date Picker",
            content: <DatePicker setTempValue={setTempValue} tempValue={tempValue} />,
        },
    ];

    return (
        <Tabs isLazy>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title="Date Picker"
                placement="bottom"
                headerContent={<TabsList tabs={tabs} />}
                drawerHeaderStyle={{ padding: 0, px: 4, py: 4, paddingBottom: 0, gap: 4, mb: 0.5 }}
            >
                <TabPanels>
                    {tabs.map((tab) => (
                        <TabPanel p={0} paddingInline={0} key={tab.title}>
                            {tab.content}
                        </TabPanel>
                    ))}
                </TabPanels>
                <DateRangeFooter value={tempValue} />
                <ControlButtons
                    value={value}
                    tempValue={tempValue}
                    onChange={onChange}
                    setTempValue={setTempValue}
                    onClose={onClose}
                />
            </Drawer>
        </Tabs>
    );
}
