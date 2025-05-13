import { Box, VStack, useBreakpointValue } from '@chakra-ui/react';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useContext, useEffect, useRef } from 'react';
import StoreFooter from './components/footer/StoreFooter';
import StoreHeader from './components/header/StoreHeader';
import PreviewHiro from './components/hiro/PreviewHiro';
import PreviewHomepage from './components/homepage/PreviewHomepage';

/**
 * Store preview component that renders the full storefront with responsive design
 */
function StorePreview(): React.ReactElement {
  const {
    state: {
      device,
      shop: { shopDesign: { backgroundBody } },
      activeSection
    },
    methods: { dispatch }
  } = useContext(designerContext);

  // Section references for scrolling
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const storeRef = useRef(null);
  const footerRef = useRef(null);

  const isSmallerThanLg = useBreakpointValue({ base: true, lg: false });

  // Switch to tablet view when viewport is too small
  useEffect(() => {
    if (isSmallerThanLg && device === 'desktop') {
      dispatch({ type: 'updateState', params: { device: 'tablet' } });
    }
  }, [isSmallerThanLg, device, dispatch]);

  // Handle scrolling to active section
  useEffect(() => {
    if (!activeSection) return;

    // Scroll to top of preview
    const scrollToTop = () => {
      if (containerRef.current) {
        containerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      const previewContainer = document.querySelector('.preview-container');
      if (previewContainer) {
        previewContainer.scrollTop = 0;
      }
    };

    // Scroll to specific section
    const scrollToSection = (ref) => {
      if (ref?.current) {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // Handle different sections
    switch (activeSection) {
      case 'header':
        scrollToTop();
        break;
      case 'hero':
      case 'store':
        scrollToSection(heroRef);
        break;
      case 'footer':
        scrollToSection(footerRef);
        break;
      default:
        break;
    }
  }, [activeSection]);

  // Calculate device width based on selected device view
  const getDeviceWidth = () => {
    const deviceKey = device === 'desktop' && isSmallerThanLg ? 'tablet' : device;

    switch (deviceKey) {
      case 'mobile':
        return '360px';
      case 'tablet':
        return isSmallerThanLg ? '100%' : '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  // Return blur style for sections not currently active
  const getBlurStyle = (sectionId?) => {
    const isActiveOrRelated =
      !activeSection ||
      activeSection === sectionId ||
      (sectionId === 'hero' && activeSection === 'store') ||
      (sectionId === 'store' && activeSection === 'hero') ||
      activeSection === 'theme' ||
      activeSection === 'settings' ||
      sectionId === null;

    if (isActiveOrRelated) {
      return {};
    }

    return {
      filter: 'blur(8px)',
      opacity: 0.4,
      transition: 'filter 0.3s ease, opacity 0.3s ease',
      pointerEvents: 'none'
    };
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" ref={containerRef} className="preview-container" id="preview-container" userSelect="none">
      <VStack
        width={getDeviceWidth()}
        height="auto"
        position="relative"
        spacing="0"
        align="stretch"
        overflow="hidden"
        backgroundColor={backgroundBody || '#1e1e1e'}
        borderRadius="16px"
        boxShadow="0px 8px 30px rgba(0, 0, 0, 0.45)"
      >
        <Box position="relative" data-section="header" id="header-section" ref={headerRef} sx={getBlurStyle('header')}>
          <StoreHeader />
        </Box>

        <VStack align="stretch" spacing="0">
          <Box data-section="hero" ref={heroRef} sx={getBlurStyle('hero')}>
            <PreviewHiro />
          </Box>

          <Box data-section="store" ref={storeRef} sx={getBlurStyle()}>
            <PreviewHomepage />
          </Box>
        </VStack>

        <Box data-section="footer" ref={footerRef} sx={getBlurStyle('footer')}>
          <StoreFooter />
        </Box>
      </VStack>
    </Box>
  );
}

export default StorePreview;
