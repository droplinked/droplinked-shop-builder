import { Tooltip } from '@chakra-ui/react'

import { IconComponent, IconWrapper } from "../../Sidebar-style";

const OptionComponent = ({ icon , label}) => {
  return (
    <Tooltip label={label}  placement='right-start' borderRadius='8px' bg='mainLayer' >
    <IconWrapper>
      <IconComponent src={icon} />
    </IconWrapper>
    </Tooltip>
  );
};

export default OptionComponent;
