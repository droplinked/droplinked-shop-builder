import { Outlet } from "react-router-dom";
import {
  UserWrapperPage,
  PageContainer,
} from "./user-wrapper-style";

import Sidebar from "../../layouts/sidebar/Sidebar"

const UserWrapper = () => {


  return (
    <UserWrapperPage>
        {/* <Sidebar /> */}
      <PageContainer>
        <Outlet />
      </PageContainer>
    </UserWrapperPage>
  );
};

export default UserWrapper;
