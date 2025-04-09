import { Box, HStack, useBreakpointValue, VStack } from '@chakra-ui/react';
import AdminHoc from 'hoc/admin/adminHoc';
import useAppStore from 'lib/stores/app/appStore';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayoutHeader from './components/header/DashboardLayoutHeader';
import DashboardLayoutSidebar from './components/sidebar/DashboardLayoutSidebar';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';

const DashboardLayout = ({ children }: { children?: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAppStore();
  const { resetOnboarding } = useOnboardingStore()
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });
  // Reference for detecting clicks outside the sidebar
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Redirect users with specific statuses
  useEffect(() => {
    if (['PROFILE_COMPLETED', 'VERIFIED'].includes(user?.status)) {
      navigate('/onboarding?entry=store-details');
    } else {
      resetOnboarding();
    }
  }, [user, navigate]);

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  }, [location]);

  // Close sidebar when clicking outside (only in mobile view)
  useEffect(() => {
    if (!isSidebarOpen || !isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <VStack width="full" height="full" {...(location.endsWith('/plans') && { overflow: 'auto' })}>
      <HStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
        {/* Sidebar: Absolute in mobile, static in desktop */}
        {isMobile ? (
          isSidebarOpen && (
            <>
              <Box position="fixed" top="0" left="0" width="100vw" height="100vh" bg="blackAlpha.600" zIndex="overlay" onClick={() => setIsSidebarOpen(false)} />
              <Box ref={sidebarRef} position="fixed" top="74px" left="0" width="288" minHeight="calc(80vh - 76px)" maxHeight="calc(100vh - 76px)" bg="white" overflowY="auto" zIndex="modal">
                <DashboardLayoutSidebar isSidebarOpen={isSidebarOpen} />
              </Box>
            </>
          )
        ) : (
          <DashboardLayoutSidebar isSidebarOpen={isSidebarOpen} />
        )}

        {/* Main content */}
        <VStack flex="1" height="full" width="full">
          <DashboardLayoutHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <Box width="100%" minH="80vh" borderColor="neutral.gray.850" padding={6}>
            {children || <Outlet />}
          </Box>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default AdminHoc(DashboardLayout);
