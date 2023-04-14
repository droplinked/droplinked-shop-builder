import { useProfile } from "hooks/useProfile/useProfile";
//
import DefaultHeaderComponent from "./components/default-header-component/DefaultHeaderComponent";
import UserHeaderComponent from "./components/user-header-component/UserHeaderComponent";

const HeaderLayout = () => {
  const { profile } = useProfile();

  return <>{profile ? <UserHeaderComponent /> : <DefaultHeaderComponent />}</>;
};

export default HeaderLayout;

// <BurgerIcon
// src={burger}
// //onClick={toggleSideBar}
// //   transform={showSideBar ? "rotate(90deg)" : "rotate(0deg)"}
// transition="1s"
// />

// <HeaderWrapper>
//   <Flex w="auto" alignItems="center">
//     <BurgerIcon
//       src={burger}
//       onClick={toggleSideBar}
//       transform={showSideBar ? "rotate(90deg)" : "rotate(0deg)"}
//       transition="1s"
//       // transform: rotate(45deg);
//     />

//     <HeaderTitle onClick={navigateToLandingPage}>droplinked</HeaderTitle>
//   </Flex>
//   <Flex h="100%" alignItems="center">
//     {profile ? (
//       <Flex h="100%" alignItems="center">
//         {isCustomer ? <CustomerHeader /> : <ProducerHeader />}
//       </Flex>
//     ) : (
//       <PublicHeader />
//     )}
//     <EmailModal show={showEmailModal} close={toggleEmailModal} />
//   </Flex>
// </HeaderWrapper>
