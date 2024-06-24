import { Flex } from "@chakra-ui/react";
import React from "react";
import OptionComponent from "./components/option-component/OptionComponent";
import { OPTIONS } from "./options-constant";

const SidebarLayout = () => {
  return (
    <Flex w="100%" h="100%" minH="100%" flexDir="column" gap="18px">
      {OPTIONS.map((opt, i) => (
        <OptionComponent
          key={i}
          icon={opt.icon}
          label={opt.label}
          path={opt?.path}
        />
      ))}
    </Flex>
  );
};

export default SidebarLayout
