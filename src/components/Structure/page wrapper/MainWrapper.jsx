import { useState, useEffect } from "react";
import "./mainWrapper.scss";
import SideCard from "../../../layout/sideCard/SideCard";
import { Box } from "@chakra-ui/react";
import SideCardItem from "../../../layout/sideCard/SideCardItem";
import HamburgerMenu from "../../../layout/menu/HamburgerMenu";
import { useLocation } from "react-router-dom";
import { useCart } from "../../../sevices/hooks/useCart";

export default function MainWrapper({ children }) {
  const { cartItems } = useCart();
  // show card state
  const [showCard, setShowCard] = useState(true);

  // get location of url
  const location = useLocation();

  // check location with useEffect
  useEffect(() => {
    if (location.pathname == "/" || location.pathname == "/crashpunks") {
      setShowCard(false);
    } else {
      setShowCard(true);
    }
  }, [location]);

  return (
    <Box display={"flex"}>
      {/* main wrapper for maining everything */}
      <div className="wrapper">
        <div className="main-side" style={{ width: "100%" }}>
          <div className="child-wrapper">{children}</div>
        </div>
      </div>

      {showCard && (
        <>
          {/* side card */}
          <Box display={["none", "none", "none", "none", "block"]}>
            {cartItems.length > 0 && (
              <SideCard>
                {cartItems.map((product) => {
                  return <SideCardItem product={product} />;
                })}
              </SideCard>
            )}
          </Box>
          {/* hambuerger button */}
          <Box
            display={["block", "block", "block", "block", "none"]}
            position="fixed"
            left={["80%", "85%", "90%"]}
            top={"12%"}
            zIndex="99"
          >
            <HamburgerMenu>
              <SideCard>
              {cartItems.map((product) => {
                  return <SideCardItem product={product} />;
                })}
              </SideCard>
            </HamburgerMenu>
          </Box>
        </>
      )}
    </Box>
  );
}

// import './mainWrapper.scss';
// import SideCard from '../../../layout/sideCard/SideCard';
// import { Box } from '@chakra-ui/react';
// import SideCardItem from '../../../layout/sideCard/SideCardItem';
// import HamburgerMenu from '../../../layout/menu/HamburgerMenu';
// import { useCart } from "../../../sevices/hooks/useCart"

// export default function MainWrapper({ children }) {
// 	const { cartItems } = useCart();
// 	return (
// 		<Box display={'flex'}>
// 			{/* main wrapper for maining everything */}
// 			<div className="wrapper">
// 				<div className="main-side" style={{ width: '100%' }}>
// 					<div className="child-wrapper">{children}</div>
// 				</div>
// 			</div>
// 			{/* side card */}
// 			<Box display={['none', 'none', 'none', 'none', 'block']}>

// 					{ (cartItems.length>0) &&
// 					<SideCard>
// 					{cartItems.map((product)=>{
// 						return (<SideCardItem product={product} />)
// 					})}
// 					</SideCard>
// 					}

// 			</Box>
// 			{/* hambuerger button */}
// 			<Box
// 				display={['block', 'block', 'block', 'block', 'none']}
// 				position="fixed"
// 				left={['80%', '85%', '90%']}
// 				top={'12%'}
// 				zIndex="99"
// 			>
// 				<HamburgerMenu>
// 					<SideCard>
// 						<SideCardItem />
// 						<SideCardItem />
// 						<SideCardItem />
// 					</SideCard>
// 				</HamburgerMenu>
// 			</Box>
// 		</Box>
// 	);
// }
