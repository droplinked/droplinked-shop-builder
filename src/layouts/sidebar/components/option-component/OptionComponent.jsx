import { IconComponent, IconWrapper } from "../../Sidebar-style";

const OptionComponent = ({ icon }) => {
  return (
    <IconWrapper>
      <IconComponent src={icon} />
    </IconWrapper>
  );
};

export default OptionComponent;
