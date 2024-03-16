import { Switch, SwitchProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends SwitchProps {}

function AppSwitch(props: IProps) {
    return <Switch border={"none"} outline={"none"} size="md" {...props} />;
}

export default AppSwitch;
