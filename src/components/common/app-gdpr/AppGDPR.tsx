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
              alignItems: "center",
              gap: "12px",
              flexDirection: "column",
              backgroundColor: "#1a1a1a",
              position: "fixed",
              bottom: 0,
              width: "100%",
              padding: "22px 12px",
              color: "#fff",
              zIndex: 99999,
            }}
          >
            <Flex flexDirection={"column"} alignItems={"flex-start"} width={"90%"}>
              <AppTypography fontSize={"28px"} fontWeight={600} color={"#2EC99E"}>Privacy Policy</AppTypography>
              <AppTypography fontSize={{ base: "16px", md: "22px" }}>
                Droplinked values your privacy. We collect minimal data such as name, email, and IP address to provide our services. Your data is protected and you have the right to access, correct, or delete it. For inquiries, contact us at <Link href="mailto:Support@droplinked.com" color={"#2EC99E"} fontSize={{ base: "16px", md: "22px" }}>Support@droplinked.com</Link> .
              </AppTypography>
            </Flex>
            <Flex
              alignItems={"center"}
              justifyContent={"flex-end"}
              gap={"8px"}
              width={"85%"}
            >
              <Button
                onClick={handleDecline}
                variant="outline"
                borderColor={"#9C4EFF"}
                color={"#9C4EFF"}
                backgroundColor={"transparent"}
                width={"150px"}
                _hover={{ backgroundColor: "#9C4EFF", color: "#fff" }}
                _active={{ backgroundColor: "#7a40c7", borderColor: "#7a40c7", color: "#fff" }}
              >
                Deny
              </Button>
              <Button
                onClick={handleAccept}
                backgroundColor={"#2EC99E"}
                color={"#fff"}
                width={"150px"}
                _hover={{ backgroundColor: "#17916f" }}
                _active={{ backgroundColor: "#0e664a" }}
              >
                Accept
              </Button>
            </Flex>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}

export default AppGDPR;
