import { Tooltip } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

import { useProfile } from '../../../../hooks/useProfile/useProfile';
import { IconComponent, IconWrapper } from "../../Sidebar-style";

const OptionComponent = ({ icon , label , path}) => {

  const navigate = useNavigate();
  const { shop } = useProfile();

  const clickOnIcon = () => navigate(`/${shop.name}/${path}`);

  return (
    <Tooltip label={label}  placement='right-start' borderRadius='8px' bg='mainLayer' >
    <IconWrapper onClick={clickOnIcon}>
      <IconComponent src={icon} />
    </IconWrapper>
    </Tooltip>
  );
};

export default OptionComponent;
