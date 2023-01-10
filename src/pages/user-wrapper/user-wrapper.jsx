import { Outlet } from "react-router-dom";
import {
  UserWrapperPage,
  SideBarWrapper,
  PageContainer,
} from "./user-wrapper-style";

import Sidebar from "../../layouts/sidebar/Sidebar"

const UserWrapper = () => {


  return (
    <UserWrapperPage>
      {/* <SideBarWrapper> */}
        <Sidebar />
      {/* </SideBarWrapper> */}
      <PageContainer>
        <Outlet />
      </PageContainer>
    </UserWrapperPage>
  );
};

export default UserWrapper;
