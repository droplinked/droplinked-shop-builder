import React, { useState, useEffect } from 'react';
import { Button, Flex, Link } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import AppTypography from '../typography/AppTypography';

function AppGDPR() {
  const [consent, setConsent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userConsent = getCookie('userConsent');
    if (userConsent) {
      setConsent(userConsent);
    }
    setLoading(false);
  }, []);

  const setCookie = (name: string, value: string, days: number): void => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  };

  const getCookie = (name: string) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const eraseCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
  };

  const handleAccept = () => {
    setConsent('accepted');
    setCookie('userConsent', 'accepted', 90);
    // Set other cookies here as needed
  };

  const handleDecline = () => {
    setConsent('declined');
    eraseCookie('userConsent');
    // Erase other cookies here as needed
  };

  if (loading || consent) {
    return null;
  }

  return (
    <>
      {!consent && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "fixed",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 1 }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              flexDirection: "column",
              backgroundColor: "#141414",
              position: "fixed",
              bottom: 0,
              width: "100%",
              padding: "32px",
              color: "#fff",
              borderRadius: "15px",
              zIndex: 99999,
            }}
          >
            <AppTypography textAlign={{base: "center", sm: "left"}} fontSize={"24px"} fontWeight={700} color={"#2BCFA1"} width={"100%"}>Privacy Policy</AppTypography>
            <AppTypography textAlign={{base: "center", sm: "left"}} fontSize={{ base: "14px", md: "20px" }} fontWeight={500}>
              Droplinked values your privacy. We collect minimal data such as name, email, and IP address to provide our services. Your data is protected and you have the right to access, correct, or delete it. For inquiries, contact us at <Link href="mailto:Support@droplinked.com" textDecoration={"underline"}>Support@droplinked.com</Link> .
            </AppTypography>
            <Flex
              alignItems={"center"}
              justifyContent={{base: "center", sm: "flex-start"}}
              gap={"16px"}
              flexDirection={{base: "column", sm: "row"}}
              width={"100%"}
            >
              <Button
                onClick={handleAccept}
                backgroundColor={"#2BCFA1"}
                color={"#084836"}
                width={{base: "100%", sm: "160px"}}
                padding={"12px 36px"}
                _hover={{ backgroundColor: "#17916f" }}
                _active={{ backgroundColor: "#0e664a" }}
              >
                Accept
              </Button>
              <Button
                onClick={handleDecline}
                color={"#C2C2C2"}
                backgroundColor={"#292929"}
                width={{base: "100%", sm: "160px"}}
                padding={"12px 36px"}
                _hover={{ backgroundColor: "#3A3A3A", color: "#C2C2C2" }}
                _active={{ backgroundColor: "#1F1F1F", color: "#C2C2C2" }}
              >
                Decline
              </Button>
            </Flex>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}

export default AppGDPR;
