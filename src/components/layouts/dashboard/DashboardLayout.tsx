import { Box, HStack, useBreakpointValue, VStack } from '@chakra-ui/react';
import AdminHoc from 'functions/hoc/admin/adminHoc';
import useAppStore from 'lib/stores/app/appStore';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayoutHeader from './components/header/DashboardLayoutHeader';
import DashboardLayoutSidebar from './components/sidebar/DashboardLayoutSidebar';

const DashboardLayout = ({ children }: { children?: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAppStore();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  // Determine if padding should be applied based on the route
  const unneededPaddingRoutes = ['account-settings', 'credits-and-activity'];
  const shouldApplyPadding = !unneededPaddingRoutes.some((path) => location.includes(path));
  const isMobile = useBreakpointValue({ base: true, md: false });
  // Reference for detecting clicks outside the sidebar
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Redirect users with specific statuses
  useEffect(() => {
    if (['PROFILE_COMPLETED', 'VERIFIED'].includes(user?.status)) {
      navigate('/analytics/registration');
    }
  }, [user, navigate]);

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location]);

  // Close sidebar when clicking outside (only in mobile view)
  useEffect(() => {
    if (!isMobile || !isSidebarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  return (
    <VStack width="full" height="full" {...(location.endsWith('/plans') && { overflow: 'auto' })}>
      <HStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
        {/* Sidebar: Absolute in mobile, static in desktop */}
        {isMobile ? (
          isSidebarOpen && (
            <Box ref={sidebarRef} position="absolute" top="76px" left="0" width="250px" height="100vh" bg="white" zIndex="modal">
              <DashboardLayoutSidebar isSidebarOpen={isSidebarOpen} />
            </Box>
          )
        ) : (
          <DashboardLayoutSidebar isSidebarOpen={isSidebarOpen} />
        )}

        {/* Main content */}
        <VStack flex="1" height="full" width="full">
          <DashboardLayoutHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <Box width="100%" minH="80vh" borderColor="line" padding={shouldApplyPadding ? 6 : 0}>
            {children || <Outlet />}
          </Box>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default AdminHoc(DashboardLayout);
