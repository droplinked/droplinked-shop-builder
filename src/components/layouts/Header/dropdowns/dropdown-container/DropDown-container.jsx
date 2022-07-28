import { Box, keyframes, usePrefersReducedMotion } from '@chakra-ui/react'
import { DROPDOWN_TYPE } from "../dropdown.type"

import ProfileDropdown from "../profile-dropdown/ProfileDropdown"
import NotificationDropdown from "../notification-dropdown/Notification-dropdown"
import BasketModal from "../basket-dropdown/basket-dropdown"


const keyframe_dropdowncontainer = keyframes`
0% {
    transform: translatey(-200px);
    opacity: 0;
}
100% {
  transform: translatey(0);
  opacity: 1;
}
`;

const DropdownContainer = ({ close , dropdown }) => {

    const prefersReducedMotion = usePrefersReducedMotion();

    const dropdown_animation = prefersReducedMotion
    ? undefined
    : `${keyframe_dropdowncontainer}  0.2s linear`;

      // prevent close modal when click on modal
      const handleChildClick = event => {
        event.stopPropagation();
      };

      const dropdownType = () => {
        switch(dropdown){
          case DROPDOWN_TYPE.PROFILE:
            return <ProfileDropdown close={close} />
            case DROPDOWN_TYPE.BASKET:
            return <BasketModal close={close} />
            case DROPDOWN_TYPE.NOTIFICATION:
            return <NotificationDropdown close={close} />
        }
      }

    return (
        <Box
            w='100%'
            h='100%'
            position= "absolute"
            overflow='auto'
            top='0'
            left='0'
            zIndex='30'
            animation={dropdown_animation}
            onClick={close}
            >
            <Box
            onClick={handleChildClick}
            >
                 {dropdownType()} 
            </Box>
        </Box>
    )
}


export default DropdownContainer 